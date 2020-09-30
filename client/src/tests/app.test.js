import React from 'react';
import { shallow } from 'enzyme';

import ProductForm from '../components/ProductForm.js';

describe('Product Form Tests', () => {
  let wrapper;
  const product = {
    id: "1234abcd",
    title: "Test Product",
    price: 100.00,
    quantity: 5,
  }

  let submitFunction;

  beforeEach(() => {
    submitFunction = jest.fn();

    wrapper = shallow(
      <ProductForm
        product={product}
        onSubmit={submitFunction}
        onClose={() => {}}
      />
    );
  });

  test('Product From Renders', () => {
    expect(
      wrapper.find('form').length
    ).toEqual(1)
  });

  test('State is updated when input changes', () => {
    const input = wrapper.find("input[name='title']").first();
    const newText = 'changed';

    input.simulate('change', {
      target: {
        name: 'title',
        value: newText,
      }
    });

    expect(
      wrapper.state().title
    ).toBe(newText);
  });

  test('Submitting form invokes submit function', () => {
    const submitButton = wrapper.find('.button').first();

    submitButton.simulate('click', {
      preventDefault: () => {}
    });

    expect(
      submitFunction.mock.calls.length
    ).toBe(1);
  });

  test('Form is submitted with the right arguments', () => {
    const submitButton = wrapper.find('.button').first();

    submitButton.simulate('click', {
      preventDefault: () => {}
    });

    expect(
      submitFunction.mock.calls[0][0]
    ).toEqual(product);
  });
});
