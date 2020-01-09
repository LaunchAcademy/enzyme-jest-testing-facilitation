import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new Adapter() })

import Elephant from "./Elephant"
import { BrowserRouter, Link } from "react-router-dom"

describe("Elephant", () => {
  let wrapper, fakeClickFunction
  // create two variables in a scope available to the "it" blocks

  beforeEach(() => {
    // run the following before each "it" block
    // onClickMock = jest.fn()
    fakeClickFunction = jest.fn()
    // prepare a fake function that we can use as a callback
    wrapper = mount(
      <BrowserRouter>
        <Elephant
          image="http://fakeurl.com/elephant"
          text="I am an Elephant!"
          handleClick={fakeClickFunction}
        />
      </BrowserRouter>
      // pretend this Component was on the DOM with said "standard" props
    )
  })

  fit("should render an h1 element containing the text received via props", () => {
    console.log(wrapper.find("h1").debug())
    expect(wrapper.find("h1").text()).toBe("I am an Elephant!")
    // test the part of our component that is dynamic i.e. the text in the h1
    // find the element by its tag, reveal its text node, assert equality
  })

  it("should render an img tag with the specific props", () => {
    expect(wrapper.find("img").props()).toEqual({
      src: "http://fakeurl.com/elephant",
      height: "400",
      width: "600"
    })
    // test the part of our component that is dynamic i.e. the url in the img
  })

  it("should render an img tag with the specific props", () => {
    expect(wrapper.find("img").props()["src"]).toBe(
      "http://fakeurl.com/elephant"
    )
  })
  // alternative way to test the above

  it("should invoke the onClick function from props when clicked", () => {
    wrapper.simulate("click")
    // click on the component
    expect(fakeClickFunction).toHaveBeenCalled()
    // ONLY see that it was called, not that it did anything
    // we only care about this child component's responsbility, which is to listen for a click and call the function that was passed
    // the EFFECT of that function happens to our ElephantContainer
  })

  // it("should render a link to /facts", () => {
  //   expect(wrapper.find("Link").props()["to"]).toBe("/facts")
  //   // test the part of our component that is dynamic i.e. path in the link tag
  // })
})
