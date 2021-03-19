import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;

class Faq extends React.Component
{
    render()
    {
        const text1 = `Yes, you can pay cash on receiving your order by the waiter.`
        const text2 = `You can pay online while ordering by using a credit or debit card payment option.`
        const text3 = `Yes, you can find every restaurant of this foodcourt in our application.`
        const text4 = `Yes, you can change your order before placing it.`
        const text5 = `No, once you had placed your order, you can't cancel it.`
        const text6 = `Yes, you can do this by sharing your concerns or comments in the “Special Instructions” box on the “Checkout” page.`
        const text7 = `Yes, you can give reviews.`
        const text8 = `Yes, by signing in your last used account you can get your orders history.`
        const text9 = `Yes, you can order from more than one restaurant at a time.`

        return(
            <div>
                <h2 style={{ paddingTop:'2.25em', color:'var(--color4)'}}>FREQUENTLY ASK QUESTIONS (FAQ)</h2>
                <br/>
                 <Collapse style={{opacity:'60%'}} accordion>
                    <Panel header={<b>How can I order food in Pakistan?</b>} key="1">
                    <p>
                        To order food, follow these simple steps:
                    </p>
                    <ul>
                        <li>
                            Sign in your account, if you are not registered yet, then first get yourself registered.
                        </li>
                        <li>
                            Find your restaurant or item or deal. 
                        </li>
                        <li>
                            Select your item or deal.
                        </li>
                        <li>
                            Click on the Add To Cart button.
                        </li>
                        <li>
                            You can increase or decrease the quantity of your deal or item.
                        </li>
                        <li>
                            Open your food cart.
                        </li>
                        <li>
                            Proceed to checkout.
                        </li>
                        <li>
                            Select your payment order.
                        </li>
                        <li>
                            Place your order.
                        </li>
                        <li>
                            Wait for your order.
                        </li>
                    </ul>         
                    </Panel>
                    <Panel header={<b>Can you pay cash for your order?</b>} key="2">
                    <p>{text1}</p>
                    </Panel>
                    <Panel header={<b>How can I pay online?</b>} key="3">
                    <p>{text2}</p>
                    </Panel>
                    <Panel header={<b>Is every restaurant in the foodcourt in this application?</b>} key="4">
                    <p>{text3}</p>
                    </Panel>
                    <Panel header={<b>Can changes to my order be made?</b>} key="5">
                    <p>{text4}</p>
                    </Panel>
                    <Panel header={<b>Can my order be cancelled?</b>} key="6">
                    <p>{text5}</p>
                    </Panel>
                    <Panel header={<b>Can I give special instructions?</b>} key="7">
                    <p>{text6}</p>
                    </Panel>
                    <Panel header={<b>Can I give reviews?</b>} key="8">
                    <p>{text7}</p>
                    </Panel>
                    <Panel header={<b>Can I see my previous orders?</b>} key="9">
                    <p>{text8}</p>
                    </Panel>
                    <Panel header={<b>Can I order from multiple restaurants at a time?</b>} key="10">
                    <p>{text9}</p>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}

export default Faq;