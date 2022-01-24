import React from 'react'
import { render } from 'enzyme'

import Post, { PostPropTypes } from '../Post'

const setUp = (props: PostPropTypes) => render(<Post {...props} />)

describe('Post component', () => {
  const props = {
    post: {
      userId: 1,
      id: 1,
      title: 'Uchiha Itachi',
      body: 'Body of Itachi',
    },
  }

  it('renders a div that contains an <a> tag with href and title in', () => {
    const wrapper = setUp(props)
    expect(wrapper).toMatchSnapshot()
  })

  it('contains the title of post from props', () => {
    const wrapper = setUp(props)
    expect(wrapper.find('a').text()).toEqual(props.post.title)
  })

  it('contains a link to the post with id equals id from props', () => {
    const wrapper = setUp(props)
    expect(wrapper.find('a').attr('href')).toContain(props.post.id.toString())
  })
})
