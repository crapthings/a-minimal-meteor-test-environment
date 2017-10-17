import React, { Component } from 'react'

import { mount } from 'react-mounter'

import { composeWithTracker } from 'react-komposer'

const CURRENT = new ReactiveVar()

class Sidebar extends Component {
  componentWillUnmount() {
    console.log('will i unmount')
  }

  render() {
    return <ul>
      <li><a href='/'>home</a></li>
      <li><a href='/pagea'>page a</a></li>
      <li><a href='/pageb'>page b</a></li>
      <li><a href='/pagec'>page c</a></li>
      <li>{this.props.current}</li>
    </ul>
  }
}

const ComposeSidebar = composeWithTracker((props, onData) => {
  const current = CURRENT.get()
  console.log('what is current', current)
  onData(null, { current })
})(Sidebar)

const LayoutA = ({ page }) => {
  // const ComposeSidebar = composeWithTracker((props, onData) => {
  //   const current = CURRENT.get()
  //   console.log('what is current', current)
  //   onData(null, { current })
  // })(Sidebar)
  return <div>
    <ComposeSidebar />
    {page()}
  </div>
}

const LayoutB = ({ page }) => <div>
  {page()}
</div>

const Home = () => <div>
  <h1>home</h1>
</div>

const PageA = () => <div>
  <h1>page a</h1>
</div>

const PageB = composeWithTracker((props, onData) => {
  CURRENT.set('hello kitty')
  onData(null, {})
})(() => <div>
  <h1>page b</h1>
</div>)

const PageC = () => <div>
  <h1>page c</h1>
</div>

FlowRouter.route('/', {
  action() {
    mount(LayoutA, {
      page: () => <Home />
    })
  }
})

FlowRouter.route('/pagea', {
  action() {
    mount(LayoutA, {
      page: () => <PageA />
    })
  }
})

FlowRouter.route('/pageb', {
  action() {
    mount(LayoutA, {
      page: () => <PageB />
    })
  }
})

FlowRouter.route('/pagec', {
  action() {
    mount(LayoutB, {
      page: () => <PageC />
    })
  }
})
