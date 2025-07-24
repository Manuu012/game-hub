// Snake.ts

export type Position = { x: number; y: number };

class Node {
  position: Position;
  next: Node | null = null;

  constructor(position: Position) {
    this.position = position;
  }
}

export class Snake {
  head: Node;
  tail: Node;
  positionsSet: Set<string>;

  constructor(initialPos: Position) {
    const node = new Node(initialPos);
    this.head = node;
    this.tail = node;
    this.positionsSet = new Set([this.posToStr(initialPos)]);
  }

  posToStr(pos: Position): string {
    return `${pos.x},${pos.y}`;
  }

  move(newHeadPos: Position, grow: boolean) {
    const newHead = new Node(newHeadPos);
    newHead.next = this.head;
    this.head = newHead;
    this.positionsSet.add(this.posToStr(newHeadPos));

    if (!grow) {
      const beforeTail = this.findBeforeTail();
      if (beforeTail) {
        this.positionsSet.delete(this.posToStr(this.tail.position));
        beforeTail.next = null;
        this.tail = beforeTail;
      }
    }
  }

  hasCollision(pos: Position): boolean {
    return this.positionsSet.has(this.posToStr(pos));
  }

  findBeforeTail(): Node | null {
    let current = this.head;
    while (current.next && current.next !== this.tail) {
      current = current.next;
    }
    return current === this.tail ? null : current;
  }

  getBody(): Position[] {
    let body: Position[] = [];
    let curr: Node | null = this.head;
    while (curr) {
      body.push(curr.position);
      curr = curr.next;
    }
    return body;
  }
}
