import { mount } from '@vue/test-utils'
import TransactionItem from './TransactionItem.vue'

describe('TransactionItem.vue', () => {
  it('show a NEW badge if we have isNew key in transaction prop', () => {
    const wrapper = mount(TransactionItem, {
      propsData: {
        transaction: {
          account_id: '3fd98d3d-1ef8-4500-bca0-5e3603250302',
          amount: 1,
          created_at: '2022-05-20T18:36:16.338585+00:00',
          transaction_id: '9d219a92-0e7b-4b6a-9d54-eb163630e24d',
          isNew: true,
        },
      },
    })

    const newBadge = wrapper.find('.t-transaction-item__badge')
    expect(newBadge.exists()).toBe(true)

    wrapper.destroy()
  })
})
