class _Node {
  constructor(value, next) {
    this.value = value,
    this.next = next 
  }
}

class LinkedList {
  constructor() {
    this.head = null
  }
  // Insert Node at the front of the LL 
  insertFirst(value) {
    this.head = new _Node(value, this.head)
  }
  // Insert Node at the end of the LL
  insertLast(value) {
    if(this.head === null) {
      this.insertFirst(value)
    } else {
      // save the the head to a variable to serve temporarily because you need this variable to change values in order to move through the LL. 
      let tempNode = this.head;
      while(tempNode.next !== null) {
        tempNode = tempNode.next
      }
      tempNode.next = new _Node(value, null)
    }
  }

  find(item) {
    // start at the head 
    let currentNode = this.head
    // is the list empty? 
    if(!this.head) {
      return null
    }
    // check for the item 
    while(currentNode.value !== item) {
       // return null if its the end of the list and the item is not on the lsit 
      if(currentNode.next === null) {
        return null;
      } else {
        currentNode = currentNode.next
      }

      return currentNode; 
    } 

     

      // otherwise, keep looking 

    // Found it

  }
}