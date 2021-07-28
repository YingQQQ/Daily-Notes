/* eslint-disable no-unused-vars */
import Comparator from "./utils/comparator";

function toString<T>(value: T): string {
  return String(value);
}

interface findObj {
  value?: number;
  callback?: Function;
}

type callback = typeof toString;

class LinkListNode {
  constructor(public value: number, public next: LinkListNode | null = null) {}

  toString(callback: callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

class LinkedList {
  head: LinkListNode | null;
  tail: LinkListNode | null;
  compare: Comparator;

  constructor(comparatorFunction: Function) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  prepend(value: number): LinkedList {
    const newNode = new LinkListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = this.head;
    }

    return this;
  }

  append(value: number): LinkedList {
    const newNode = new LinkListNode(value);

    // 可能是第一个值
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    // 如果已经存在header，那我们添加到尾部
    this.tail = newNode;
    this.tail.next = newNode;

    return this;
  }
  delete(value: number): LinkListNode {
    if (!this.head) {
      return null;
    }
    let deleteNode = null;

    if (this.head && this.compare.equal(value, this.head.value)) {
      deleteNode = this.head;
      this.head = this.head.next;
    }
    let currentNode = this.head;

    if (currentNode !== null) {
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }
    return deleteNode;
  }
  find({ value, callback }: findObj): LinkListNode {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;
    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }
  deleteTail(): LinkListNode {
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail;
    }

    let currentNode = this.head;

    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    return deletedTail;
  }

  deleteHead(): LinkListNode {
    if (!this.head) {
      return null;
    }
    const deleteHead = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deleteHead;
  }

  fromArray(values: number[]): LinkedList {
    values.forEach(value => {
      this.append(value);
    });
    return this;
  }
  toArray(): LinkListNode[] {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }
  reverse(): LinkedList {
    // 12->13
    let currentNode = this.head;
    let prevNode = null;
    let nextNode = null;
    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = prevNode;

      prevNode = currentNode;
      currentNode = nextNode;
    }
    this.tail = this.head;
    this.head = prevNode;
    return this;
  }
}
