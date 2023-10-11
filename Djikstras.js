function getNeighbors(node, numRows, numCols) {
  const directions = [
      [-1, 0],  // Up
      [1, 0],   // Down
      [0, -1],  // Left
      [0, 1],   // Right
  ];

  const neighbors = [];

  directions.forEach(([dx, dy]) => {
      const newRow = node.row + dx;
      const newCol = node.col + dy;

      if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
          neighbors.push({ row: newRow, col: newCol });
      }
  });

  return neighbors;
}

export function dijkstra(grid, startNode, endNode) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  const unvisitedNodes = [];
  const distances = {};
  const previousNodes = {};

  for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
          const nodeKey = `${row}-${col}`;
          distances[nodeKey] = Infinity;
          unvisitedNodes.push({ row, col });
      }
  }

  distances[`${startNode.row}-${startNode.col}`] = 0;

  while (unvisitedNodes.length) {
      unvisitedNodes.sort((a, b) => distances[`${a.row}-${a.col}`] - distances[`${b.row}-${b.col}`]);

      const closestNode = unvisitedNodes.shift();
      if (distances[`${closestNode.row}-${closestNode.col}`] === Infinity) break;

      if (closestNode.row === endNode.row && closestNode.col === endNode.col) break;

      for (const neighbor of getNeighbors(closestNode, numRows, numCols)) {
          const neighborKey = `${neighbor.row}-${neighbor.col}`;
          const tentativeDistance = distances[`${closestNode.row}-${closestNode.col}`] + grid[neighbor.row][neighbor.col];

          if (tentativeDistance < distances[neighborKey]) {
              distances[neighborKey] = tentativeDistance;
              previousNodes[neighborKey] = closestNode;
          }
      }
  }

  let currentNode = endNode;
  const path = [];

  while (currentNode != null) {
      path.unshift(currentNode);
      currentNode = previousNodes[`${currentNode.row}-${currentNode.col}`];
  }

  if (!path.length || path[0].row !== startNode.row || path[0].col !== startNode.col) return [];

  return path;
}
