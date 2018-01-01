import React, { Component } from 'react';

class FixerItemSidebar extends Component {
    render() {
        var itemClassName = "list-group-item d-flex justify-content-between align-items-center";
        itemClassName = this.props.isActive ? itemClassName + " active" : itemClassName;

        return (
        <div>
            <li className={itemClassName} onClick={ this.props.onActiveTab }>
                <code>{this.props.fixerName}</code>
                <span className="badge badge-pill">
                {this.props.isRisky ?
                <span title="Considered Risky"><i className="fas fa-exclamation-circle" style={{color:"red"}}></i></span>
                : null}
                {` `}
                {this.props.fixer["configurable"] && this.props.fixer["configuration"].length === 1
                    ? <span title="Configurable rule"><i className="fas fa-cog" title="Configurable rule"></i></span>
                    : null}
                {this.props.fixer["configurable"] && this.props.fixer["configuration"].length > 1
                    ? <span title="Configurable rule"><i className="fas fa-cogs" title="Configurable rule"></i></span>
                    : null}
                </span>

            </li>
        </div>
        );
    }
}

export default FixerItemSidebar;
