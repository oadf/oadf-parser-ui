import React, { Component } from 'react';
import { graphql } from 'graphql';
import GraphiQL from 'graphiql';
import Dropzone from 'react-dropzone';
import Select from 'react-select';
import parser from 'oadf-parser-seltec3-pdf';
import 'graphiql/graphiql.css';
import 'react-select/dist/react-select.css';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      schema: null,
      selectedFile: null,
      statusText: 'Drop a file or click to select file.',
    };
  }

  onDrop = (files) => {
    this.setState({
      selectedFile: files[0],
    });
    setTimeout(() => this.loadSchema(), 0);
  };

  loadSchema() {
    const { selectedFile } = this.state;
    this.setState({
      statusText: 'Loading...',
    });
    parser(selectedFile.preview).then((schema) => {
      this.setState({
        schema,
        statusText: `${selectedFile.name} was loaded.`,
      });
    });
  }

  fetcher = graphQLParams => graphql(this.state.schema, graphQLParams.query);

  render() {
    const { statusText } = this.state;
    const options = [
      { value: 'seltec3-pdf', label: 'SELTEC3 PDF Result List' },
    ];
    const defaultQuery = `# Welcome to the OADF Parser
#    
# This program reads files from athletics software and gives you the 
# possibility to query the data using GraphQL based on the OADF Schema.
# 
# Select or drop a file on the top. After the data was parsed you can use
# a query to get the data from the file.
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the OADF schema and live syntax and validation errors 
# highlighted within the text.
#
# Keyboard shortcuts:
#
#       Run Query:  Ctrl-Enter (or press the play button above)
#
#   Auto Complete:  Ctrl-Space (or just start typing)
#
    `;
    return (
      <div className="wrapper">
        <GraphiQL fetcher={this.fetcher} schema={this.state.schema} defaultQuery={defaultQuery}>
          <GraphiQL.Logo>
            <div className="logo" />
            <h1>OADF Parser</h1>
          </GraphiQL.Logo>
          <GraphiQL.Toolbar>
            <Dropzone multiple={false} onDrop={this.onDrop} className="dropzone">
              {statusText}
            </Dropzone>
            <div className="select-wrapper">
              <Select value="seltec3-pdf" options={options} />
            </div>
          </GraphiQL.Toolbar>
        </GraphiQL>
      </div>
    );
  }
}
