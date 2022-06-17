import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'


test('when new blog is created', async () => {
  const newBlog = {
    likes: 0,
    author: 'Me',
    title: 'Test Blog',
    url: 'ref4rfg34f.com'
  }

  const mockHandlerCreate = jest.fn()

  render(<CreateBlog addNewBlog={mockHandlerCreate} visibility={true}></CreateBlog>)

  const user = userEvent.setup()
  const createBlogBtn = screen.getByText('create blog')

  const titleInput = screen.getByPlaceholderText('title content')
  const authorInput = screen.getByPlaceholderText('author content')
  const urlInput = screen.getByPlaceholderText('url content')

  await user.type(titleInput, newBlog.title)
  await user.type(authorInput, newBlog.author)
  await user.type(urlInput, newBlog.url)

  await user.click(createBlogBtn)

  expect(mockHandlerCreate.mock.calls[0][0].title).toBe('Test Blog')
  expect(mockHandlerCreate.mock.calls[0][0].author).toBe('Me')
  expect(mockHandlerCreate.mock.calls[0][0].url).toBe('ref4rfg34f.com')


})

//CI=true npm test