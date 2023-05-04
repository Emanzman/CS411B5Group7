import React from "react";
import './instagramCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import profilePic from '../stockImages/Instagram.png';

class InstagramCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return (
            <div className="instagram-card">
                <div className="instagram-card-header">
                    <img src={profilePic} className="instagram-card-user-image" alt="User Profile"/>
                    <a className="instagram-card-user-name">theRealJohnSmith</a>
                </div>

                <div className="instagram-card-image">
                    <img src={this.props.image} alt="Post Image" class="instagram-card-image"/>
                </div>

                <div className="instagram-card-content">
                    <p className="likes">Likes: ?</p>
                    <p><a className="instagram-card-content-user" >theRealJohnSmith</a> 
                    <a className="instagram-card-content-caption" > {this.props.caption} </a>
                    <a className="hashtag">{this.props.tags}</a></p>
                    
                </div>

            </div>
        )
    }
}


export default InstagramCard