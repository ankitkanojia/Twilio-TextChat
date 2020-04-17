import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="#">Real-Time</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className={"nav-item " + this.props.location.pathname === "/" ? "active" : ""}>
                                    <Link to="/" className="nav-link">OneToOne Text Chat</Link>
                                </li>
                                <li className={"nav-item " + this.props.location.pathname === "/GroupChat" ? "active" : ""}>
                                    <Link to="/GroupChat" className="nav-link" href="#">Group Chat</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </React.Fragment>
        )
    }
}

export default withRouter(Header);