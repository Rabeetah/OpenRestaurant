import React from 'react';
import {Card} from 'antd';
import "antd/dist/antd.css";
import './aboutus.css';
import Image from "react-bootstrap/Image";
import abc from '../../../assets/images/abc.jpeg';
import def from '../../../assets/images/def.jpeg';
import ghi from '../../../assets/images/ghi.jpg';

export default class AboutUs extends React.Component
{
    render()
    {
        return(
            <div className='about-us-container'>
                <br/><br/>
                <center>
                <div className='div-our-story'>
                <Card className='heading-our-story'>
                    <h1 className='our-story'>Our Story</h1>
                </Card>
                </div>
                </center>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className='story-part1' style={{overflow:'hidden', display: 'inline', width: '80%'}}>
                <div className='story-1-picture-card'>
                    <Image
                  className="image"
                  width={250}
                  height={220}
                  src={ghi}
                  roundedCircle
                />
                </div>
                    <p className='story-part1-p'>The journey of Open Restaurant started when one day I had to visit someone at the food court. Unfortunately, that was the peak hour we agreed on. We wanted to grab something to eat and sit in the food court. 
                    But there was no way we could request our order before half an hour. 
                    That rush and long queues made me think, is there a way to solve or minimize this issue? 
                    Not only for my self but others as well? So We aimed to solve this problem in our FYP project.</p>
                </div>
                <br style={{clear:'both'}}/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className='story-part2' style={{overflow:'hidden', display: 'inline', width: '80%'}}>
                <div className='story-2-picture-card'>
                    <Image
                  className="image"
                  width={250}
                  height={220}
                  src={abc}
                  roundedCircle
                />
                </div>
                    <p className='story-part2-p'>In the of current COVID condition, this proposed system somewhat tries to reduce the no. of contacts at food court can minimizing the queue for ordering food.</p>
                </div>
                <br style={{clear:'both'}}/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className='story-part1' style={{overflow:'hidden', display: 'inline', width: '80%'}}>
                <div className='story-1-picture-card'>
                    <Image
                  className="image"
                  width={250}
                  height={220}
                  src={def}
                  roundedCircle
                />
                </div>
                    <p className='story-part1-p'>Our belief is that food associates individuals 
                    with one another and their societies. We need this sort of custom in our 
                    lives now like never before.</p>
                </div>
                <br style={{clear:'both'}}/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
    
}

