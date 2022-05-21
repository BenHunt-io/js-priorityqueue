const MinHeap = require('../app/MinHeap');

test('Construct min heap with an array of values', () => {
    let heap = new MinHeap([4,7,2,1,5,8,20,6,3]);
    expect(heap.toString()).toBe("1,2,4,3,5,8,20,7,6");
    expect(heap.size()).toBe(9);
})

test("Construct empty heap", () => {
    let heap = new MinHeap();
    expect(heap.size()).toBe(0);
});

test("Insert elements into empty heap", () => {
    let heap = new MinHeap();
    heap.insert(5);
    heap.insert(3);
    heap.insert(1);
    expect(heap.toString()).toBe("1,5,3");
    expect(heap.size()).toBe(3);
});

test("Delete element from populated min heap", () => {
    let heap = new MinHeap([4,7,2,1,5,8,20,6,3]);
    heap.delete();
    expect(heap.toString()).toBe("2,3,4,6,5,8,20,7");
    expect(heap.size()).toBe(8);
});

test("Delete multiple elements from populated min heap", () => {
    let heap = new MinHeap([4,7,2,1,5,8,20,6,3]);
    heap.delete();
    heap.delete();
    heap.delete();
    expect(heap.toString()).toBe("4,5,8,6,7,20");
    expect(heap.size()).toBe(6);
});

test("Delete all elements", () => {
    let values = [4,7,2,1,5,8,20,6,3];
    let heap = new MinHeap(values);
    for(let i = 0; i<values.length; i++){
        heap.delete();
    }
    expect(heap.toString()).toBe("");
    expect(heap.size()).toBe(0);
});


test("Use heap with a mapping function", () => {

    let calorieMap = new Map([
        ["pizza", 260],
        ["chips", 100],
        ["cookie", 150]
    ]);

    let entries = [];
    for(let entry of calorieMap){
        entries.push(entry);
    }

    let heap = new MinHeap(entries, entry => entry[1]);

    expect(heap.toString()).toBe("100,260,150");
});