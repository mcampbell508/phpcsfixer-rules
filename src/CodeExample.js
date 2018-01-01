import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CodeExample extends Component {
    static defaultProps = {
        configurable: false,
        configIndex: 0,
    };

    render() {
        var rule = this.getRuleExample();

        return (
            <div>
                <h3>Example <code>.php_cs</code> / <code>.php_cs.dist</code></h3>
                <pre>
                    <code class="php">
                    {`<?php

    $rules = [
        ${rule}
        //...
    ];

    return PhpCsFixer\\Config::create()
        ->setRules($rules)
        ->setFinder(PhpCsFixer\\Finder::create()
            ->exclude('vendor')
            ->in(__DIR__)
        );
    `}
                    </code>
                </pre>
            </div>
        );
    }

    getRuleExample() {
        if (!this.props.isConfigurable) {
            return `'${this.props.fixerName}' => true,`;
        }

        if (this.props.fixer["configuration"].length === 1) {
            var config = this.props.fixer["configuration"][0];

            return (
                `'${this.props.fixerName}' => [
            '${config["name"]}' => '${config["allowedValues"][this.props.valueId]}',
        ],`
            );
        }
    }
}

export default CodeExample;
