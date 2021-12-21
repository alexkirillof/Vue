import { mount } from '@vue/test-utils';
import Calc from '../pages/Calc.vue';

describe('Calculator testing', () => {
    it('Test first operand', () => {
        const wrapper = mount(Calc);
        const op1Input = wrapper.find('input[name=op1]');
        op1Input.setValue(1);
        expect(wrapper.vm.op1).toBe(1);
    });
    it('Test second operand', () => {
        const wrapper = mount(Calc);
        const op2Input = wrapper.find('input[name=op2]');
        op2Input.setValue(2);
        expect(wrapper.vm.op2).toBe(2);
    });

    it('Test sum method', () => {
        const wrapper = mount(Calc);
        const op1Input = wrapper.find('input[name=op1]');
        const op2Input = wrapper.find('input[name=op2]');
        const sumButton = wrapper.find('button[name="+"]');

        op1Input.setValue(1);
        op2Input.setValue(2);
        sumButton.trigger('click');

        expect(wrapper.vm.result).toBe(3);
    });

    it('Test diff method', () => {
        const wrapper = mount(Calc);
        const op1Input = wrapper.find('input[name=op1]');
        const op2Input = wrapper.find('input[name=op2]');
        const diffButton = wrapper.find('button[name="-"]');

        op1Input.setValue(10);
        op2Input.setValue(2);
        diffButton.trigger('click');

        expect(wrapper.vm.result).toBe(8);
    });

    it('Test div method', () => {
        const wrapper = mount(Calc);
        const op1Input = wrapper.find('input[name=op1]');
        const op2Input = wrapper.find('input[name=op2]');
        const divButton = wrapper.find('button[name="/"]');
        op1Input.setValue(4);
        op2Input.setValue(2);
        divButton.trigger('click');
        expect(wrapper.vm.result).toBe(2);
    });

    test('Test mult method', () => {
        const wrapper = mount(Calc);
        const op1Input = wrapper.find('input[name=op1]');
        const op2Input = wrapper.find('input[name=op2]');
        const multButton = wrapper.find('button[name="*"]');
        op1Input.setValue(4);
        op2Input.setValue(2);
        multButton.trigger('click');
        expect(wrapper.vm.result).toBe(8);
    });

    test('Test deg method', () => {
        const wrapper = mount(Calc);
        const op1Input = wrapper.find('input[name=op1]');
        const op2Input = wrapper.find('input[name=op2]');
        const degButton = wrapper.find('button[name="**"]');
        op1Input.setValue(4);
        op2Input.setValue(2);
        degButton.trigger('click');

        expect(wrapper.vm.result).toBe(16);
    });

    test('Test integer method', () => {
        const wrapper = mount(Calc);
        const op1Input = wrapper.find('input[name=op1]');
        const op2Input = wrapper.find('input[name=op2]');
        const integerButton = wrapper.find('button[name="%"]');
        op1Input.setValue(5);
        op2Input.setValue(2);
        integerButton.trigger('click');

        expect(wrapper.vm.result).toBe(2);
    });





});