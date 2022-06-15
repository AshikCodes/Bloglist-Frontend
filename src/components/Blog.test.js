import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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

//CI=true npm test