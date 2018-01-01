import React, { Component } from 'react';
import { ReactGhLikeDiff } from 'react-gh-like-diff';
import 'diff2html/dist/diff2html.css';

class SingleConfigFixer extends Component {

    render() {
        var fixer = this.props.fixer;
        var fixerName = this.props.fixerName;

        return (
            <div>
                <ReactGhLikeDiff
                    key={fixerName}
                    past={fixer.codeSamples[0].from}
                    current={fixer.codeSamples[0].to}
                    options={
                        {
                            outputFormat: 'line-by-line',
                            originalFileName: `${fixerName}_example.php`,
                            updatedFileName: `${fixerName}_example.php`,
                        }
                    }
                />
            </div>
        );
    }

    getRiskyContent() {
        return (
            <div style={{ color: "red" }}>
                <i className="fa fa-exclamation-circle" ></i> (Risky)
              {` - `}
                {this.props.fixer["riskyDescription"]}
            </div>
        );
    }

    showSingleExample() {
        var fixer = this.props.fixer;
        var fixerName = this.props.fixerName;

        return (
            <div>
                <ReactGhLikeDiff
                    key={fixerName}
                    past={fixer.codeSamples[0].from}
                    current={fixer.codeSamples[0].to}
                    options={
                        {
                            outputFormat: 'line-by-line',
                            originalFileName: `${fixerName}_example.php`,
                            updatedFileName: `${fixerName}_example.php`,
                        }
                    }
                />
            </div>
        );
    }

    showMultipleExamples() {
        var fixer = this.props.fixer;
        var fixerName = this.props.fixerName;
        var tabs = {}

        if (fixer["configuration"].length === 1
            && fixer["configuration"][0].hasOwnProperty("allowedValues")) {
                tabs = fixer["configuration"][0]["allowedValues"];
            } else if (fixer["configuration"].length === 1
            && fixer["configuration"][0].hasOwnProperty("allowedTypes")) {
                tabs = fixer["configuration"][0]["allowedTypes"];
            }

        return (
            <div>
                <nav class="nav nav-tabs" id="configurableRulesTab" role="tablist">
                    {fixer["configuration"].length === 1 ? tabs.map((config, index) => {
                        var itemClassName = `nav-item nav-link ${this.isActiveConfigTab(index) ? " active" : ""}`;

                        return <a className={itemClassName} id={`nav-${fixerName}-${config}-tab`} data-toggle="tab"
                            href={`#nav-${fixerName}-${config}`} role="tab" aria-controls={`nav-${fixerName}-${config}`}
                            aria-selected={`${this.isActiveConfigTab(index) ? true : false}`}
                            onActiveTab={this.setActiveConfigTab.bind(this, index)}>
                            {config} {index === 0 ? " (Default)" : ""}
                            </a>;
                    }) : null}
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    {fixer["configuration"].length === 1 ? tabs.map((config, index) => {
                        var itemClassName = `tab-pane fade ${this.isActiveConfigTab(index) ? " show active" : ""}`;
                        return <div class={itemClassName}
                        id={`nav-${fixerName}-${config}`} role="tabpanel" aria-labelledby={`nav-${fixerName}-${config}-tab`}>
                            <ReactGhLikeDiff
                                key={fixerName}
                                past={fixer.codeSamples[index].from}
                                current={fixer.codeSamples[index].to}
                                options={
                                    {
                                        outputFormat: 'line-by-line',
                                        originalFileName: `${fixerName}_example_${config}.php`,
                                        updatedFileName: `${fixerName}_example_${config}.php`,
                                    }
                                }
                            />
                            <hr />
                            <code>
                                'align_multiline_comment' => true,
                            </code>
                        </div>
                    }) : null}
                </div>
            </div>
        );
    }
}

export default SingleConfigFixer;
