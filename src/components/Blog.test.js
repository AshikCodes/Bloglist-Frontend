import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
    likes: 0,
    author: 'Me',
    title: 'Test Blog',
    url: 'ref4rfg34f.com'
  }

  const { container } = render(<Blog blog={blog} />)
  const blogTitle = container.querySelector('.title-container')
  const blogAuthor = container.querySelector('.author-container')
  const blogUrl = container.querySelector('.url-container')
  const blogLikes = container.querySelector('.likes-container')

  expect(blogAuthor).toHaveStyle('display: block')
  expect(blogLikes).toBeNull()
  expect(blogTitle).toHaveStyle('display: block')
  expect(blogUrl).toBeNull()
})

test('test for when button is clicked', async () => {
  const blog = {
    likes: 0,
    author: 'Me',
    title: 'Test Blog',
    url: 'ref4rfg34f.com'
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const blogLikes = container.querySelector('.likes-container')
  const blogUrl = container.querySelector('.url-container')

  expect(blogLikes).not.toHaveStyle('display: none')
  expect(blogUrl).not.toHaveStyle('display: none')

})

//CI=true npm test