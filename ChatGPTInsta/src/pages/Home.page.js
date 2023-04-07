import './Home.page.css';
import React from 'react';
import UserInput from './components/UserInput';
import InstagramCard from './components/InstagramCard';

import { ProSidebarProvider } from 'react-pro-sidebar';
import { Sidebar, Menu, MenuItem, sidebarClasses} from 'react-pro-sidebar';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          generatedCaption : null,
          generatedTags : null
        }
      }

    render(){
    return (
        <div className='GenerationPage'>
        
            <div className="SideWrap">
            <ProSidebarProvider>
            
            <Sidebar
            backgroundColor = {`rgba(33, 33, 33, 1)`} 
            rootStyles={{
            [`.${sidebarClasses.container}`]: {
                color: 'white',
            },
            }}
            >
            <Menu menuItemStyles={{
            button: {
            '&:hover': {
                backgroundColor: 'rgba(50, 50, 50, 1)',
            },},
            }}>
            <MenuItem> Profile </MenuItem>
            <MenuItem> Generation </MenuItem>
            </Menu>
        </Sidebar>
        </ProSidebarProvider>
        </div>
    
        <InstagramCard 
        caption={this.state.generatedCaption}
        tags={this.state.generatedTags}/>
    
        <UserInput 
        setCaption={(inputCaption)=>{this.setState({generatedCaption : inputCaption})}}
        setTags={(inputTags)=>{this.setState({generatedTags : inputTags})}}/>
    
        </div>
        );
    }
}

export default Home;