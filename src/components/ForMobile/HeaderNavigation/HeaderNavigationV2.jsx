import React  from 'react';
import './HeaderNavigationV2.scss'
import { withRouter } from 'react-router-dom'
import LeftArrowIcon from '../../../assets/icons/LeftArrowIcon';

class HeaderNavigationV2 extends React.Component{
    render() {
        return(
            <div className={'new-header-navigation-container '+(!this.props.isTransparent ?'bg-white':'bg-transparent')+(this.props.sticky ? ' sticky ' : '')+(this.props.fixed ? ' fixed ' : '')}>
                <div className='header-navigation'>
                    <div className={`back-icon ${this.props.isBlack ? 'black' : ''}`} onClick={()=>this.props.history.goBack()}>
                        <LeftArrowIcon className="icon" />
                    </div>
                    {
                        this.props.title &&
                        <p className={`title ${this.props.isBlack ? 'black' : ''} ${this.props.titleCentered ? 'center' : ''}`}>
                            {this.props.title}
                        </p>
                    }
                    {
                        this.props.renderRightIcon ?
                            this.props.renderRightIcon(this.props.isBlack)
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(HeaderNavigationV2);