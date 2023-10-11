import React, { Component } from 'react';
import './App.css';
import { dijkstra } from './Djikstras.js';

class Grid extends Component {
  state = {
    startNode: null,
    endNode: null,
    path: [],
  };

  handleCellClick = (rowIndex, colIndex) => {
    const { startNode, endNode } = this.state;
    const clickedNode = { row: rowIndex, col: colIndex };

    if (!startNode && !endNode) {
      this.setState({ startNode: clickedNode });
    } else if (startNode && !endNode) {
      this.setState({ endNode: clickedNode }, this.calculatePath);
    } else if (startNode && endNode) {
      this.setState({ startNode: endNode, endNode: clickedNode }, this.calculatePath);
    }
  };

  calculatePath = () => {
    const grid = new Array(25).fill(null).map(row => new Array(25).fill(1));
    const path = dijkstra(grid, this.state.startNode, this.state.endNode);
    this.setState({ path });
    this.props.updatePathData(this.state.startNode, this.state.endNode, path.length);
  };

  render() {
    const { startNode, endNode, path } = this.state;
    const numRows = 25;
    const numCols = 25;

    return (
      <div className="grid-container">
        {Array.from({ length: numRows }, (_, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {Array.from({ length: numCols }, (_, colIndex) => (
              <div
                key={colIndex}
                className={`grid-cell ${
                  startNode &&
                  startNode.row === rowIndex &&
                  startNode.col === colIndex
                    ? "start-node"
                    : endNode &&
                      endNode.row === rowIndex &&
                      endNode.col === colIndex
                    ? "end-node"
                    : path.some(
                        (node) => node.row === rowIndex && node.col === colIndex
                      )
                    ? "path-node"
                    : ""
                }`}
                onClick={() => this.handleCellClick(rowIndex, colIndex)}
              >
                {startNode &&
                  startNode.row === rowIndex &&
                  startNode.col === colIndex && (
                    <div className="node-label">{`S`}</div>
                  )}
                {endNode &&
                  endNode.row === rowIndex &&
                  endNode.col === colIndex && (
                    <div className="node-label">{`E`}</div>
                  )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

class App extends Component {
  state = {
    startNode: null,
    endNode: null,
    pathLength: 0,
  };

  updatePathData = (startNode, endNode, pathLength) => {
    this.setState({ startNode, endNode, pathLength });
  };

  render() {
    const { startNode, endNode, pathLength } = this.state;

    return (
      <div className="app">
        <header className="app-header">
          <h1>Welcome to Pathfinding Visualizer</h1>
          <h2>Experience the visualization of the famous Dijkstra's shortest path algorithm in action!</h2>
        </header>

        <Grid updatePathData={this.updatePathData} />

        <div className="info-section">
          <table>
            <tbody>
              <tr>
                <td>Start Node:</td>
                <td>{startNode ? `(${startNode.row}, ${startNode.col})` : "N/A"}</td>
              </tr>
              <tr>
                <td>End Node:</td>
                <td>{endNode ? `(${endNode.row}, ${endNode.col})` : "N/A"}</td>
              </tr>
              <tr>
                <td>Path Length:</td>
                <td>{pathLength ? `${pathLength}` : "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
