import { mount } from '@vue/test-utils';
import TestComponent from './TestComponent';

describe('TestComponent testing', () => {
  test('Test content', () => {
    const wrapper = mount(TestComponent, {
      propsData: {
        message: 'New Test massage'
      }
    })
    expect(wrapper.html()).toContain('Test massage is')
  })
})
