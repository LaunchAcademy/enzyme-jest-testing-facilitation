import React from "react"
import Enzyme, { mount } from "enzyme"
import { act } from "react-dom/test-utils"
import Adapter from "enzyme-adapter-react-16"

import Elephant from "./Elephant"
import ElephantContainer from "./ElephantContainer"

Enzyme.configure({ adapter: new Adapter() })

describe("ElephantContainer", () => {
  let wrapper
  // create one variable for the component in a scope available to the "it" blocks

  beforeEach(() => {
    wrapper = mount(<ElephantContainer />)
    // pretend this Component was on the DOM, available in each "it" block

  })

  it("starts with a big elephant", () => {
    expect(wrapper.find(Elephant).props().text).toMatch("big elephant")
    // ensure the proper PROPS were passed, but dont assert what is on the page
  })

  it("starts with a big elephant", () => {
    const elephantComponent = wrapper.find(Elephant)

    act(() => {
        elephantComponent.props().handleClick()
    })
    // user events need to be wrapped in "act" so that your component behaves like it would on an actual DOM
    wrapper.update()
    expect(wrapper.find(Elephant).props().text).toMatch("Look at the baby elephant!")
    // ensure the proper PROPS were passed, but dont assert what is on the page
  })

  it("changes the image when clicked", () => {
    const elephantComponent = wrapper.find(Elephant)
    const imageBefore = elephantComponent.props().image

    act(() => {
      wrapper
        .find(Elephant)
        .props()
        .handleClick()
    })
    // user events need to be wrapped in "act" so that your component behaves like it would on an actual DOM
    wrapper.update()
    // tell the component to render based on batch actions (like changes to state)
    expect(wrapper.find(Elephant).props().image).not.toEqual(imageBefore)
    // ensure the proper props are passed/not passed
  })

  it("changes back when the image is clicked twice", () => {
    const elephantComponent = wrapper.find(Elephant)
    const imageBefore = elephantComponent.props().image

    act(() => {
      wrapper
        .find(Elephant)
        .props()
        .handleClick()
    })
    wrapper.update()

    act(() => {
      wrapper
        .find(Elephant)
        .props()
        .handleClick()
    })
    wrapper.update()

    expect(wrapper.find(Elephant).props().image).toEqual(imageBefore)
  })
})
