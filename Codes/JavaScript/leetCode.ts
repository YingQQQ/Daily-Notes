/**
 * No:1 两数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * @example [3, 3], 6 => [0, 1]
 */
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  let res: number[] = [];

  for (let index = 0; index < nums.length; index++) {
    const element = nums[index];
    map.set(element, index);
  }

  for (let index = 0; index < nums.length; index++) {
    const element = nums[index]; // 2
    const complement = target - element; // 7
    const has = map.has(complement);
    const value = map.get(complement);
    if (has && value !== index && typeof value === "number") {
      res = [index, value];
    }
  }
  return res;
}

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val || 0;
    this.next = next || null;
  }
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  return null;
}
