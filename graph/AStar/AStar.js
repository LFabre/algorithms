// References:
//  - https://www.geeksforgeeks.org/a-search-algorithm/
//  - https://hankus.github.io/javascript-astar/docs/astar.html
//  - https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/
//
// Time Complexity  - O(E) - Being E the total number of edges
// Space Complexity - O(V) - Being V the total number of vertices
//
// A* is an path finding algorithm which uses a heuristic function
// to speed up the process of retrieving the optimal path.
//
// F = G + H (Best total heuristic so far)
// G = Cost from start until the current node, following the current
//     mapped path.
// H = The estimated cost between the current node until the final
//     destination.

const WIDTH = 3;
const HEIGHT = 3;

const WALL = '#';
const FREE = ' ';

function getNeighbors(aStarGrid, aStartNode) {
  return [
    [aStartNode.y - 1, aStartNode.x],
    [aStartNode.y + 1, aStartNode.x],
    [aStartNode.y, aStartNode.x - 1],
    [aStartNode.y, aStartNode.x + 1]
  ].filter(([y, x]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH)
    .map(([y, x]) => aStarGrid[y][x])
}

function heuristic(aStarGrid, endX, endY) {
  return Math.abs(aStarGrid.x - endX) + Math.abs(aStarGrid.y - endY);
}

function aStar(grid, startY, startX, endY, endX) {
  const aStarGrid = [];
  for (let y = 0; y < grid.length; y++) {
    const row = [];

    for (let x = 0; x < grid[y].length; x++) {
      row.push({
        y: y,
        x: x,
        value: grid[y][x],
        H: null,
        G: Infinity,
        F: Infinity,
        closed: false,
        visited: false,
        parent: null
      });
    }

    aStarGrid.push(row);
  }

  const openList = [];

  openList.push(aStarGrid[startY][startX]);

  while (openList.length) {

    // Get the best node on the open list (Best F).
    // This process can be greatly improved if a Heap is used.
    let bestNodeIdx = 0;
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].F < openList[bestNodeIdx].F) {
        bestNodeIdx = i;
      }
    }

    const currentNode = openList.splice(bestNodeIdx, 1)[0];

    // End case
    if (currentNode.y === endY && currentNode.x === endX) {
      let curr = currentNode, path = [];

      while (curr.parent) {
        path.push(curr);
        curr = curr.parent;
      }
      return path.reverse();
    }

    currentNode.closed = true;

    for (const neighbor of getNeighbors(aStarGrid, currentNode)) {
      // Ignore invalid nodes
      if (neighbor.closed || neighbor.value === WALL) {
        continue;
      }

      const beenVisited = neighbor.visited;

      const distanceFromCurrentToNeighbor = 1;
      const gScore = currentNode.G + distanceFromCurrentToNeighbor;

      // First time arriving at this node, H must be set as is undefined yet.
      if (!beenVisited) {
        neighbor.H = heuristic(neighbor, endX, endY);
        neighbor.visited = true;
        openList.push(neighbor);
      }

      // Found an optimal path to this node. Save how this node was reached
      // and update G and F values
      if (!beenVisited || gScore < neighbor.G) {
        neighbor.parent = currentNode;
        neighbor.G = gScore;
        neighbor.F = neighbor.G + neighbor.H;
      }
    }
  }

  // No path found
  return [];
}

console.log(
  aStar([
    ['', WALL, ''],
    ['', WALL, ''],
    ['', '', ''],
  ], 0, 0, 0, 2)
)