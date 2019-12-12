// Features of LL
// efficient insertion & deletion
// no random access (array does)
// efficient indexing ( i think this pertains to memory storage)
// no memory waste - non-contiguous
// sequential access
// slow

// Arrays are used more because CPU's access not only data, but data nearby, which is great
// for contiguous data structures, b/c it's all nearby. Not so with LL, as they are non-contiguous
// and therefore requires CPU to load from RAM, which is slower.

class _Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  // Insert Node at the front of the LL - this means this.head is replaced with new _Node()
  insertFirst(value) {
    this.head = new _Node(value, this.head);
    this.size++;
  }

  // Insert Node at the end of the LL
  // check whether there is even a head first, if so, keep going till you hit the end, and then
  // assign lastNode.next = new Node()
  insertLast(value) {
    if (this.head === null) {
      this.insertFirst(value);
    } else {
      // save the the head to a variable to serve temporarily because you need this variable to change values in order to move through the LL.
      let tempNode = this.head;
      // goes to the last node, then returns out of it with tempNode = tempNode.next
      // which then you reassigned to new _Node()
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(value, null);
    }
    this.size++;
  }
  // Retrieve a node
  // Check first if there is even a head. Then keep going as long as currentNode !== item.
  // If currentNode.next === null, return null. This means you didn't get a match, and
  // you can't keep traversing
  // it it's not null, then keep traversing with currentNode = currentNode.next
  // if the currentNode === item, then just return currentNode
  find(item) {
    // start at the head
    let currentNode = this.head;
    // is the list empty?
    if (!this.head) {
      return null;
    }
    // check for the item
    while (currentNode.value !== item) {
      // return null if its the end of the list and the item is not on the list
      if (currentNode.next === null) {
        return null;
        // otherwise, keep looking
      } else {
        currentNode = currentNode.next;
      }
      // Found it
      return currentNode;
    }
  }
  // challenge: implement insertBefore()
  insertBefore(newItem, nextItem) {
    let currentNode = this.head;

    while (currentNode.next !== null) {
      // this reaches last item before the above while statement stops running.
      // because if you get to "husker", its next item is indeed starbuck, adn the below runs.
      // while statement doesn't run after this.
      if (currentNode.next.value == nextItem) {
        let n = new _Node(newItem); // create new Node by itself
        // you assign it onto the new Node.
        // You did previousNode.next = new _Node(newItem), but this actually replaces the next node
        // Doing it like below allows you to replace the next node, but already have it pointing to
        // the nextItem, so it still exists and is not removed and causes no access to it.
        n.next = currentNode.next;
        currentNode.next = n; // now, you take the node BEFORE the node you want newItem before and just replace it
        // with n, cause n.next already holds the currentNode.next's original value
        return; // requires you to break out of it because if-statements need you to return to break out of it
      }
      currentNode = currentNode.next;
    }
    this.size++;
  }

  // challenge
  insertAfter(newItem, currentItem) {
    let currentNode = this.head;
    // very general while statement
    // can't be currentNode.next !== null because if it does reach that node, where its next
    // value is null, it does nothing. Basically, currentNode.next !== null doesn't reach last item
    while (currentNode.value !== null) {
      if (currentNode.value == currentItem) {
        let n = new _Node(newItem);
        // you want n.next to equal currentNode's original next value
        n.next = currentNode.next;
        // now everythign is set up for smooth reassignment.
        currentNode.next = n;
        return;
      }
      currentNode = currentNode.next;
    }
    this.size++;
  }
  // doesn't replace anything. It shifts everything over like insert before and after
  // only difference is it inserts into specific position
  insertAt(newItem, index) {
    // If index is out of range
    if (index > this.size) {
      return;
    }

    // if first index to take care of head
    if (index === 0) {
      this.insertFirst(newItem);
      return;
    }

    const n = new _Node(newItem);
    let currentNode, previousNode;

    // Set current to first
    currentNode = this.head;
    let count = 0;
    while (count < index) {
      previousNode = currentNode; // Node before index that we want to insert
      count++;
      currentNode = currentNode.next; // Node after index that we want to insert
    }

    n.next = currentNode;
    previousNode.next = n;

    this.size++;
  }

  getAt(index) {
    let currentNode = this.head;
    let count = 0;
    // once it reaches that index, it is the item/node
    while (currentNode) {
      if (count == index) {
        console.log(currentNode.value);
        return;
      }
      count++;
      currentNode = currentNode.next;
    }
    return null;
  }

  findPrevious(item) {
    if (this.head.value === item) {
      return;
    }
    let currentNode = this.head;
    while (currentNode.next !== null) {
      if (currentNode.next.value === item) {
        console.log("Previous node: ", currentNode.value);
        return;
      }
      currentNode = currentNode.next;
    }
  }

  findLast() {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }

    console.log(currentNode);
  }

  // Removal a node
  // delete from beginning?
  // delete from end?
  // delete a node between two nodes

  // Deleting from beginning
  // If you delete this.head, you must reassign this.head to new first item

  // Deleting from between 2 nodes. Find the node before the node you are deleting, and change
  // its .next to skip over the node you want go so it points to the node after that "removed" node.
  // ex: orange --> dragon fruit --> apple ==> orange --> apple
  // 1. find the node first
  // 2. orange.next --> _node{value: apple, next: ...}

  // steps:
  // check if there is a head value. If no, then null.
  // check if head === value, if yes, then reassign the head to equal the following head.
  // then we need to prepare for the while loop. We need a currentNode and a previous node.
  // we need these two because you need to skip current node, but still have access to previous node
  // and reassign previous node's next value to the currentNode's next value.
  // to traverse and keep the 2 variables moving along, we reassign them under the condition that
  // currentNode !== item and currentNode !== null
  // now deal with what the while loop doesn't deal with, which is what happens if currentNode === null.
  // this is needed because under the condition that it is null, the while loop doesn't run
  // return message if item is not found
  // then the remaining condition left over implicitly: if the currentNode === item
  // assign previousNode.next = currentNode.next
  remove(item) {
    if (!this.head) {
      return null;
    }

    // If the node to be removed is head, make the next node head
    // this specifically deal with this case.
    if (item === this.head.value) {
      this.head = this.head.next;
      return;
    }
    // Start at the head. Always define where you need to start at, because
    // this value will change when using while statement.
    let currentNode = this.head;
    // Keep track of previous because you need to do a swap.
    // if you only have currentNode, you can't really delete it by itself.
    // you need to have access to the previous node, then take the current node and equal to the
    // next node, and then take previous node's next to equal the new value in currentNode
    // missing here
    let previousNode = this.head;
    // under what conditions does this while loop stop
    while (currentNode.value !== item && currentNode !== null) {
      // while under these conditions, keep moving along
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    // if currentNode does equal null, the top while loop is not running so it comes down here
    if (currentNode === null) {
      console.log("Item not found");
    }
    // previousNode is currentNode, so if you assign previousNode.next = currentNode.next
    // this is where it skips the node you are trying to delete.
    // we don't need an if statement for this because this is the only condition left
    // if none of the above are true, then you must have hit the item.
    previousNode.next = currentNode.next; // look at this. The currentNode is skipped.
    this.size--;
  }

  // remove at a certain index
  removeAt(index) {
    // if index is out of range
    if (index >= this.size - 1) {
      return;
    }
    let currentNode = this.head;
    let previousNode;
    let count = 0;

    // remove first
    if (index === 0) {
      this.head = currentNode.next;
    } else {
      while (count < index) {
        count++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = currentNode.next;
    }
    this.size--;
  }

  clearList() {
    this.head = null;
    this.size = 0;
  }

  isEmpty() {
    if (!this.head) {
      console.log("No items in linked list");
      return true;
    } else {
      this.printList();
    }
  }

  // Reverse the list
  reverseList() {
    let currentNode = this.head;
    let previousNode = null;
    let nextNode;
    while (currentNode !== null) {
      // save the next node, b/c once you reassign the pointer for current node, this will be lost
      nextNode = currentNode.next;
      // point current node's next to previous node, which is initialized as null for this.head
      currentNode.next = previousNode;
      // We need to save the current node's value so we can point to it on the next node
      previousNode = currentNode;
      // this moves the current node along
      currentNode = nextNode;
    }
    // and this assigns head as null so that Apollo actually becomes the last item
    this.head = previousNode;
  }

  // reverseRecur() {
  //   if (!this.head) {
  //     return;
  //   }

  //   function reverseRE(current) {
  //     if (!current.next) {
  //       return current;
  //     } // the last node will stop here and not proceed below. it will be the head

  //     /*
  //  then the second to last node will be the first to proceed below
  //  the last node will point to the second to last
  //  the second to last node will point to null
  //  proceed with other nodes in the call stack until the original first node
  // */
  //     var head = reverseRE(current.next);

  //     var nextnode = current.next;
  //     nextnode.next = current;
  //     current.next = null;
  //     return head;
  //   }

  //   this.head = reverseRE(this.head);
  // }

  //similar to index, but does not begin with 0
  logNthNode(nth) {
    if (this.head === null || nth > this.size - 1) {
      return;
    }
    let currentNode = this.head;
    let count = 1;

    while (currentNode) {
      if (count === nth) {
        console.log(currentNode);
        return;
      }
      count++;
      currentNode = currentNode.next;
    }
  }

  middleOfTheList() {
    let slow_ptr = this.head;
    let fast_ptr = this.head;
    // if head has a value
    if (this.head) {
      // by the time fast ptr reaches the end, slow ptr = middle
      while (fast_ptr && fast_ptr.next) {
        // goes by times 2
        fast_ptr = fast_ptr.next.next;
        // goes 1 by 1
        slow_ptr = slow_ptr.next;
      }
      console.log("The middle pointer is: ", slow_ptr);
    }
  }

  // Cycle in list - does a node have its next pointer pointing to a previous node? This creates a cycle
  // Think race track with 2 racers
  checkForCycle() {
    if (!this.head) {
      return false;
    }
    let slow_ptr = this.head;
    let fast_ptr = this.head.next;
    // while all 3 have values or are not equal to null
    while (fast_ptr && fast_ptr.next && slow_ptr) {
      if (fast_ptr === slow_ptr) {
        console.log("Linked list has cycle");
        return true;
      }
      fast_ptr = fast_ptr.next.next;
      slow_ptr = slow_ptr.next;
    }
    console.log("No cycle exists");
    return false;
  }

  printList() {
    let node = this.head;
    if (!this.head) {
      return null;
    }

    while (node) {
      console.log(node);
      node = node.next;
    }
  }
}

function main(arr) {
  const SLL = new LinkedList();
  arr.forEach(name => SLL.insertLast(name));
  // SLL.insertLast("Tauhida");
  // SLL.remove("Husker");
  // SLL.insertBefore("BeforeItem", "Starbuck");
  // SLL.insertAfter("AfterItem", "Helo");
  // SLL.insertAfter("AfterLast", "Starbuck");
  // SLL.insertAt("insertAt", 3);
  // SLL.isEmpty();
  // the size counts the last null value as well
  // SLL.getAt(4);
  // console.log("size of LL: ", SLL.size);
  // SLL.removeAt(4);

  // SLL.findPrevious("Boomer");

  // SLL.reverseList();
  // SLL.printList();
  // SLL.findLast();
  // SLL.logNthNode(5);
  // SLL.middleOfTheList();

  // these two below together
  SLL.find("Starbuck").next = SLL.find("Helo");
  SLL.checkForCycle();
}

// main(["Apollo", "Boomer", "Helo", "Husker", "Starbuck"]);

// WHAT DOES THIS PROGRAM DO?

function WhatDoesThisProgramDo(lst) {
  let current = lst.head;
  while (current !== null) {
    let newNode = current;
    while (newNode.next !== null) {
      if (newNode.next.value === current.value) {
        newNode.next = newNode.next.next;
      } else {
        newNode = newNode.next;
      }
    }
    current = current.next;
  }
}
// Finds duplicate nodes next to one another and reassigns the second duplicate to its next value

// Sort LinkedList given input 3,2,5,7,1

const sortedList = new LinkedList();

sortedList.insertLast(66);
sortedList.insertLast(3);
sortedList.insertLast(2);
sortedList.insertLast(5);
sortedList.insertLast(7);
sortedList.insertLast(1);

// sortedList.printList();

function sortLinkedList(linkedList) {
  let currentNode = linkedList.head;
  let storeNode;
  let shouldSort = true;

  // traverse nodes so long as there's a value next to current node
  // while list is still unsorted, keep going.
  while (shouldSort) {
    // Reset shouldSort to false to continue inner looping
    shouldSort = false;

    while (currentNode.next) {
      if (currentNode.value > currentNode.next.value) {
        // swap the values of the current and next node
        // save current Node's value
        storeNode = currentNode.value;
        // now that you saved current node, you can swap and equal current node = next node
        currentNode.value = currentNode.next.value;
        // save the next value,
        currentNode.next.value = storeNode;
        // force another while
        shouldSort = true;
      }
      // traverses
      currentNode = currentNode.next;
    }
    if (!currentNode.next) {
      currentNode = linkedList.head;
    }
  }
}

sortLinkedList(sortedList);

sortedList.printList();
