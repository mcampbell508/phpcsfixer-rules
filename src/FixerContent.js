import React, { Component } from 'react';
import { ReactGhLikeDiff } from 'react-gh-like-diff';
import 'diff2html/dist/diff2html.css';
import SingleConfigFixer from './SingleConfigFixer';
import MultiConfigFixer from './MultiConfigFixer';

class FixerContent extends Component {
    render() {
        var fixer = this.props.fixer;
        var fixerName = this.props.fixerName;
        var config = this.props.fixer["configuration"];

        return (
            <div>
                <div className="card" style={{ marginBottom: "30px" }}>
                    <div className="card-body">
                        <h4 className="card-title">{this.props.fixerName}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">{this.props.fixer["summary"]}</h6>
                        <p className="card-text">
                            {this.props.fixer["risky"] ? this.getRiskyContent() : null}
                        </p>
                    </div>
                </div>

                {this.props.isConfigurable && config.length === 1
                    ? <SingleConfigFixer fixer={fixer} fixerName={fixerName}/>
                    : null}

                {this.props.isConfigurable && config.length > 1 ?
                <MultiConfigFixer fixer={fixer} fixerName={fixerName} /> : null}

                {!this.props.isConfigurable ? this.getNoConfigFixer(fixer, fixerName) : null}
            </div>
        );
    }

    getNoConfigFixer(fixer, fixerName) {
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
}

export default FixerContent;
