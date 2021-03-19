import React from 'react';
import "antd/dist/antd.css";
import { Spring, useSpring, animated } from 'react-spring/renderprops';
import { Card } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin, Button } from "antd";
import axios from 'axios';
import strawberrypic from '../images/Strawberry-Smoothie.jpg';
import bananapic from '../images/banana-smoothie.jpg';
import chocolatepic from '../images/chocolate icecream.jpg';
import sandwich from '../images/pa3.jpg';
import beefsteak from '../images/bs1.jpg';
import chickensteak from '../images/cs3.jpg';
import pizzapic from '../images/p2.jpg';
import blueberrypic from '../images/Blueberry-Smoothie.jpg';
import fishpic from '../images/cs1.jpg';
import vanillapic from '../images/vanillaicecream.jpg';
import burgerpic from '../images/b3.jpg';
import funfactspic from '../images/funfactspic.png';
import funfacts from '../images/funfacts.mp4';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import NoOrder from './noorder';

class OrdersStringsList extends React.Component {


    state = {
        dataitems: [],
        auth: false,
        funnutrients: "",
        chicken: ["Chickens aren’t completely flightless—they can get airborne enough to make it over a fence or into a tree", "One can keep a raw chicken frozen for a time span of about 2 years. Though this kind of storage is possible and does not change the taste or flavor, it is advisable not to consume chicken stored for such a prolonged time period"],
        blueberry: ["Plump, juicy, and sweet, with vibrant colors ranging from deep purple-blue to blue-black and highlighted by a silvery sheen called a bloom, blueberries are one of nature’s great treasures.",
            "Blueberries contain vitamin C", "In just one serving, you can get almost 16% of your daily requirement of Vitamin C.1 Vitamin C is necessary for growth and development of tissues and promotes wound healing",
            "A handful of blueberries can help you meet your daily fiber requirement. Dietary fiber may reduce the risk of heart disease and adds bulk to your diet, which may help you feel full faster"],
        salad: ["Many salads, with a prepared dressing, have more calories than a double cheeseburger or pizza",
            "Over 20 million servings of our salads are consumed every week",
            "The practice of salad being served first was started by the now famous medical practitioner, Hippocrates, who believed that raw vegetables easily slipped through the system and did not cause obstruction for food that followed"],
        smoothie: ["A smoothie is a thick and creamy beverage",
            "It is made from pureed raw fruit, vegetables, and sometimes dairy products (e.g. milk, yogurt, ice cream), typically using a blender",
            "Smoothies are healthy and tasty way to provide your body with nutrients, vitamins and energy",
            "For hundreds of years Mediterranean and Eastern cultures have served pureed fruit drinks that resemble what is smoothie today"],
        strawberry: ["Strawberries are bright red, juicy, and sweet",
            "They’re an excellent source of vitamin C and manganese and also contain decent amounts of folate (vitamin B9) and potassium",
            "Strawberries are very rich in antioxidants and plant compounds, which may have benefits for heart health and blood sugar control "],
        fish: ["Often undervalued parts of the fish, like the head, viscera, and back-bones make up 30-70% of fish and are especially high in micronutrients",
            "Tuna bones used for fish powder can enrich traditional diets like maize flower with omega-3 fatty acids, vitamins and minerals such as iron, zinc and calcium"],
        vegies: ["Bell peppers are usually sold green, but they can also be red, purple or yellow",
            "Tomatoes are very high in the carotenoid Lycopene; eating foods with carotenoids can lower your risk of cancer",
            "It is recommended that you eat five servings of fruit or vegetables a day. A serving equals one-half cup"],
        steak: ["Steak is naturally free of carbohydrates, including sugar and fiber",
            "Steak is an excellent source of high-quality protein"],
        banana: ["Bananas are a healthy source of fiber, potassium, vitamin B6, vitamin C, and various antioxidants and phytonutrients",
            "Bananas’ high content of resistant starch and fiber explains their low GI"],
        cheese: ["Isn’t cheese just wonderful? It’s the highlight of any sandwich, the perfect mid-afternoon snack, and simply divine when melted into pasta. Mmmm, it really is one of life’s little luxuries"],
        pizza: ["An average slice of a medium-sized cheese pizza ranges from 220 to 370 calories. Loading it up with vegetables can provide you some additional vitamins and minerals"],
        chocolate: ["The darker the chocolate, the more flavanoids and flavanols it contains",
            "Chocolate contains very small amounts of copper, iron, zinc, and protein"],
        vanilla: ["It can be tough to stay on your diet while satisfying your craving for yummy, creamy vanilla ice cream"]
    };


    static propTypes = {
        auth: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        // error : PropTypes.object.isRequired
      }

      
    componentDidMount = async () => {
        while (this.props.auth.isLoading){}
        await this.setState({redirect:true, auth: this.props.auth.isAuthenticated})
        if(this.props.auth.isAuthenticated) await this.getWords();
    }

    getWords = async () => {
        var pointerToThis = this;
        var body = JSON.stringify({ cid: this.props.auth.user._id, orderId: this.props.orderId });
        await fetch(
            `http://localhost:4000/customer/order/extractstringsfromorders`,
            {
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => response.json())
            // await this.getItems();
            .then((data) => {
                console.log(data);
                if(data.length>0) this.setState({dataitems: data});
                else this.setState({redirect1: true});

            })
    };


    render() {
        if(!this.state.auth && this.state.redirect) {
            return (<Redirect push to='/login'/>)
        }
        if(this.state.redirect1) {
            return (<NoOrder/>)
        }
        return (
            <div>
            {this.state.loading ? (
            <center>
                <Spin
                className="spinner"
                tip="Loading...Please Wait"
                size="large"
                />
            </center>
            ) : (
            <div>
                
                <div style={{ marginTop: 90 }}>
                    <div>
                        <Spring
                            from={{ opacity: 0, marginTop: -800 }}
                            to={{ opacity: 5, marginTop: 0 }}
                        >
                            {props => (
                                <div style={props}>

                                    <video alt="Straw" autoPlay='true' 
                                    style={{ marginLeft: 190, alignItems: 'center', 
                                    justifyContent: 'center', height: 500, width: 950, flex: 1 }} >
                                        <source src={funfacts} type="video/mp4"></source>
                                    </video>
                                    <Spring
                                        from={{ number: 0 }}
                                        to={{ number: 10 }}
                                        config={{ duration: 10 }}
                                    >
                                        {props => (
                                            <div style={props}>

                                            </div>
                                        )}
                                    </Spring>
                                </div>

                            )}
                        </Spring>



                    </div>


                </div>
                {this.state.dataitems.map((dataitem) => {
                    // 
                    if (dataitem == "strawberry") {
                        return <div>
                            <h1 style={{ textAlign: 'center', flex: 1, color: '#58040F', marginTop: 50 }}>Strawberry Smoothie</h1>
                            <Spring
                                from={{ opacity: 0, marginTop: -800 }}
                                to={{ opacity: 5, marginTop: 0 }}
                            >
                                {props => (
                                    <div style={props}>
                                        <div style={c1Style}>
                                            <h1 style={{ color: '#58040F' }}>Fun Facts</h1>
                                            <p style={{ textAlign: 'right', flex: 1, float: 'left' }}>{this.state.strawberry[0]}</p>
                                            <Spring
                                                from={{ number: 0 }}
                                                to={{ number: 10 }}
                                                config={{ duration: 10 }}
                                            >
                                                {props => (
                                                    <div style={props}>

                                                    </div>
                                                )}
                                            </Spring>
                                        </div>
                                    </div>
                                )}
                            </Spring>


                            <img src={strawberrypic} alt="Straw" style={{ marginRight: 40, height: 590, width: 600, marginTop: -590, alignItems: 'left', float: 'right', flex: 1 }} />
                        </div>
                    }

                    if (dataitem == "burger") {
                        return <div>
                            <h1 style={{ textAlign: 'center', flex: 1, color: '#58040F', marginTop: 50 }}>Burger</h1>
                            <Spring
                                from={{ opacity: 0, marginTop: -800 }}
                                to={{ opacity: 5, marginTop: 0 }}
                            >
                                {props => (
                                    <div style={props}>
                                        <div style={c1Style}>
                                            <h1 style={{ color: '#58040F' }}>Fun Facts</h1>
                                            <p style={{ textAlign: 'right', flex: 1, float: 'left' }}>{this.state.chicken[0]}</p>
                                            <Spring
                                                from={{ number: 0 }}
                                                to={{ number: 10 }}
                                                config={{ duration: 10 }}
                                            >
                                                {props => (
                                                    <div style={props}>

                                                    </div>
                                                )}
                                            </Spring>
                                        </div>
                                    </div>
                                )}
                            </Spring>


                            <img src={burgerpic} alt="Straw" style={{ marginRight: 40, height: 500, width: 600, marginTop: -550, alignItems: 'left', float: 'right', flex: 1 }} />
                        </div>


                    }
                    if (dataitem == "smoothie") {
                        // return <div> 
                        //<p>{this.state.smoothie[0]}</p>

                        //</div>
                    }
                    if (dataitem == "banana") {
                        return <div>
                            <h1 style={{ textAlign: 'center', flex: 1, color: '#58040F', marginTop: 50 }}>Banana Smoothie</h1>
                            <Spring
                                from={{ opacity: 0, marginTop: -800 }}
                                to={{ opacity: 5, marginTop: 0 }}
                            >
                                {props => (
                                    <div style={props}>
                                        <div style={c1Style}>
                                            <h1 style={{ color: '#58040F' }}>Fun Facts</h1>
                                            <p style={{ textAlign: 'right', flex: 1, float: 'left' }}>{this.state.banana[0]}</p>
                                            <Spring
                                                from={{ number: 0 }}
                                                to={{ number: 10 }}
                                                config={{ duration: 10 }}
                                            >
                                                {props => (
                                                    <div style={props}>

                                                    </div>
                                                )}
                                            </Spring>
                                        </div>
                                    </div>
                                )}
                            </Spring>


                            <img src={bananapic} alt="Straw" style={{ marginRight: 40, height: 570, width: 600, marginTop: -600, alignItems: 'left', float: 'right', flex: 1 }} />
                        </div>
                    }

                    if (dataitem == "pizza") {
                        //return <div>
                        //<h1>Crown Crust Pizza</h1>
                        //<p> {this.state.pizza[0]}</p>
                        //<img src={pizzapic} alt="Straw" style={{height: 500, width:600}} />
                        //</div>
                    }
                    if (dataitem == "cheese") {
                        return <div>
                            <h1 style={{ textAlign: 'center', flex: 1, color: '#58040F', marginTop: 50 }}>Crown Crust Pizza</h1>
                            <Spring
                                from={{ opacity: 0, marginTop: -800 }}
                                to={{ opacity: 5, marginTop: 0 }}
                            >
                                {props => (
                                    <div style={props}>
                                        <div style={c1Style}>
                                            <h1 style={{ color: '#58040F' }}>Fun Facts</h1>
                                            <p style={{ textAlign: 'right', flex: 1, float: 'left' }}>{this.state.cheese[0]}</p>
                                            <Spring
                                                from={{ number: 0 }}
                                                to={{ number: 10 }}
                                                config={{ duration: 10 }}
                                            >
                                                {props => (
                                                    <div style={props}>

                                                    </div>
                                                )}
                                            </Spring>
                                        </div>
                                    </div>
                                )}
                            </Spring>


                            <img src={pizzapic} alt="Straw" style={{ marginRight: 40, height: 500, width: 600, marginTop: -550, alignItems: 'left', float: 'right', flex: 1 }} />
                        </div>
                    }
                    if (dataitem == "vegies") {
                        //return <div>
                        //   <p>{this.state.vegies[0]}</p>

                        //</div>
                    }
                    if (dataitem == "fish") {
                        return <div>
                            <h1 style={{ textAlign: 'center', flex: 1, color: '#58040F', marginTop: 50 }}>Fish</h1>
                            <Spring
                                from={{ opacity: 0, marginTop: -800 }}
                                to={{ opacity: 5, marginTop: 0 }}
                            >
                                {props => (
                                    <div style={props}>
                                        <div style={c1Style}>
                                            <h1 style={{ color: '#58040F' }}>Fun Facts</h1>
                                            <p style={{ textAlign: 'right', flex: 1, float: 'left' }}>{this.state.fish[0]}</p>
                                            <Spring
                                                from={{ number: 0 }}
                                                to={{ number: 10 }}
                                                config={{ duration: 10 }}
                                            >
                                                {props => (
                                                    <div style={props}>

                                                    </div>
                                                )}
                                            </Spring>
                                        </div>
                                    </div>
                                )}
                            </Spring>


                            <img src={fishpic} alt="Straw" style={{ marginRight: 40, height: 500, width: 600, marginTop: -550, alignItems: 'left', float: 'right', flex: 1 }} />
                        </div>

                    }

                    if (dataitem == "chocolate") {
                        return <div>
                            <h1 style={{ textAlign: 'center', flex: 1, color: '#58040F', marginTop: 50 }}>Chocolate Icecream</h1>
                            <Spring
                                from={{ opacity: 0, marginTop: -800 }}
                                to={{ opacity: 5, marginTop: 0 }}
                            >
                                {props => (
                                    <div style={props}>
                                        <div style={c1Style}>
                                            <h1 style={{ color: '#58040F' }}>Fun Facts</h1>
                                            <p style={{ textAlign: 'right', flex: 1, float: 'left' }}>{this.state.chocolate[0]}</p>
                                            <Spring
                                                from={{ number: 0 }}
                                                to={{ number: 10 }}
                                                config={{ duration: 10 }}
                                            >
                                                {props => (
                                                    <div style={props}>

                                                    </div>
                                                )}
                                            </Spring>
                                        </div>
                                    </div>
                                )}
                            </Spring>


                            <img src={chocolatepic} alt="Straw" style={{ marginRight: 40, height: 500, width: 600, marginTop: -550, alignItems: 'left', float: 'right', flex: 1 }} />
                        </div>


                    }
                    if (dataitem == "vanilla") {
                        return <div>
                            <h1 style={{ textAlign: 'center', flex: 1, color: '#58040F', marginTop: 50 }}>Vanilla Icecream</h1>
                            <Spring
                                from={{ opacity: 0, marginTop: -800 }}
                                to={{ opacity: 5, marginTop: 0 }}
                            >
                                {props => (
                                    <div style={props}>
                                        <div style={c1Style}>
                                            <h1 style={{ color: '#58040F' }}>Fun Facts</h1>
                                            <p style={{ textAlign: 'right', flex: 1, float: 'left' }}>{this.state.vanilla[0]}</p>
                                            <Spring
                                                from={{ number: 0 }}
                                                to={{ number: 10 }}
                                                config={{ duration: 10 }}
                                            >
                                                {props => (
                                                    <div style={props}>

                                                    </div>
                                                )}
                                            </Spring>
                                        </div>
                                    </div>
                                )}
                            </Spring>


                            <img src={vanillapic} alt="Straw" style={{ marginRight: 40, height: 570, width: 600, marginTop: -600, alignItems: 'left', float: 'right', flex: 1 }} />
                        </div>


                    }
                    if (dataitem == "steak") {
                        return <div>
                            <h1 style={{ textAlign: 'center', flex: 1, color: '#58040F', marginTop: 20 }}>Steak</h1>
                            <Spring
                                from={{ opacity: 0, marginTop: -800 }}
                                to={{ opacity: 5, marginTop: 0 }}
                            >
                                {props => (
                                    <div style={props}>
                                        <div style={c1Style}>
                                            <h1 style={{ color: '#58040F' }}>Fun Facts</h1>
                                            <p style={{ textAlign: 'right', flex: 1, float: 'left' }}>{this.state.steak[0]}</p>
                                            <Spring
                                                from={{ number: 0 }}
                                                to={{ number: 10 }}
                                                config={{ duration: 10 }}
                                            >
                                                {props => (
                                                    <div style={props}>

                                                    </div>
                                                )}
                                            </Spring>
                                        </div>
                                    </div>
                                )}
                            </Spring>


                            <img src={chickensteak} alt="Straw" style={{ marginRight: 40, height: 600, width: 600, marginTop: -590, alignItems: 'left', float: 'right', flex: 1 }} />
                        </div>

                    }
                    if (dataitem == "salad") {
                        // return <div>
                        //    <p>{this.state.salad[0]}</p>
                        //  <img src={sandwich} alt="Straw" style={{height: 500, width:600}} />
                        // </div>
                    }
                    if (dataitem == "blueberry") {
                        return <div>
                            <h1 style={{ textAlign: 'center', flex: 1, color: '#58040F', marginTop: 20 }}>Blueberry Smoothie</h1>
                            <Spring
                                from={{ opacity: 0, marginTop: -800 }}
                                to={{ opacity: 5, marginTop: 0 }}
                            >
                                {props => (
                                    <div style={props}>
                                        <div style={c1Style}>
                                            <h1 style={{ color: '#58040F' }}>Fun Facts</h1>
                                            <p style={{ textAlign: 'right', flex: 1, float: 'left' }}>{this.state.blueberry[0]}</p>
                                            <Spring
                                                from={{ number: 0 }}
                                                to={{ number: 10 }}
                                                config={{ duration: 10 }}
                                            >
                                                {props => (
                                                    <div style={props}>

                                                    </div>
                                                )}
                                            </Spring>
                                        </div>
                                    </div>
                                )}
                            </Spring>


                            <img src={blueberrypic} alt="Straw" style={{ marginRight: 40, height: 600, width: 600, marginTop: -590, alignItems: 'left', float: 'right', flex: 1 }} />
                        </div>
                    }

                }
                )
                }
                <Link to={`/pending/order/${this.props.orderId}`}>
                    <Button className='button' key="console">
                        View Order
                        
                    </Button></Link>
            </div>
            )
    }
            </div>
        )
    }
}
const c1Style = {
    width: 380,
    height: 600,
    background: "#D64F61",
    color: "white",
    padding: "4rem",
    fontSize: 24,
    marginLeft: 90,
    marginTop: -40
};
const counter = {
    background: "#333",
    textAlign: "center",
    width: "100px",
    borderRadius: "50%",
    margin: "1rem auto"
};

const mapStateToProps = (state) => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, null) (OrdersStringsList);