class MinHeap {

    heap = [0];

    constructor(values = [], getter){
        // extracts the value to be used for sorting
        this.getter = getter;
        // Construct min heap
        for(let val of values){
            this.insert(val);
        }
    }

    front(){
        if(this.size() > 0){
            return this.heap[1];
        }
        return null;
    }

    delete(){
        
        if(this.size() == 0){
            return;
        }

        // Delete
        this.heap[1] = this.heap[this.size()];
        this.heap[0]--;

        let parentIdx = 1;
        let leftChild = this.getLeftChild(parentIdx);
        let rightChild = this.getRightChild(parentIdx);


        // Reheap tree
        while((leftChild <= this.size() && this.getValue(this.heap[parentIdx]) > this.getValue(this.heap[leftChild])) 
            || (rightChild <= this.size() && this.getValue(this.heap[parentIdx]) > this.getValue(this.heap[rightChild]))){

            let minChild = leftChild;
            if(rightChild <= this.size()){
                minChild = Math.min(this.getValue(this.heap[leftChild]), this.getValue(this.heap[rightChild])) 
                    == this.getValue(this.heap[leftChild]) ? leftChild : rightChild;
            }

            if(this.getValue(this.heap[parentIdx]) > this.getValue(this.heap[minChild])){
                this.swap(parentIdx, minChild);
                parentIdx = minChild;
            }

            leftChild = this.getLeftChild(parentIdx);
            rightChild = this.getRightChild(parentIdx);
        }
    }

    insert(val){
        let size = this.heap[0];
        this.heap[size+1] = val;

        let childIdx = size+1;
        let parentIdx = this.getParent(childIdx);

        while(parentIdx >= 1 && this.getValue(this.heap[parentIdx]) > this.getValue(this.heap[childIdx])){

            let tmp = this.heap[parentIdx];
            this.heap[parentIdx] = this.heap[childIdx];
            this.heap[childIdx] = tmp;

            childIdx = parentIdx;
            parentIdx = this.getParent(childIdx);
            
        }
        this.heap[0]++;
    }

    // private
    // returns idx of parent
    getParent(childIndex){
        return childIndex % 2 == 0 ? childIndex/2 : (childIndex+1)/2-1;

    }

    // private
    getLeftChild(parentIdx){
        return parentIdx*2;
    }

    // private
    getRightChild(parentIdx){
        return parentIdx*2+1;
    }

    toString(){
        return this.heap.slice(1, this.size()+1)
            .map(val => this.getValue(val, this.getter))
            .toString();
    }

    size(){
        return this.heap[0];
    }

    swap(idx, idxOther){
        let tmp = this.heap[idx];
        this.heap[idx] = this.heap[idxOther];
        this.heap[idxOther] = tmp;
    }

    // private
    getValue(val){
        this.getValue(val, this.getter);
    }

    getValue(val, getter){
        if(getter){
            return getter(val);
        }
        return val;
    }
}

module.exports = MinHeap;