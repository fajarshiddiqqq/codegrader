export const load = async () => {
    const questions = [
        {id:1,key:"sXsd14",title:"Fibonacci Function",desc:"Return nth fibonacci number. Optimize for n up to 1e6.",language:"Python",difficulty:"Easy",tags:["DP","Math"],pop:300},
        {id:2,key:"fjS94",title:"REST API Design",desc:"Design REST endpoints for blog with comments, pagination and auth.",language:"JavaScript",difficulty:"Medium",tags:["API","Design"],pop:520},
        {id:3,key:"bsSkm2",title:"SQL Join Optimization",desc:"Improve this slow JOIN query; explain indexes.",language:"SQL",difficulty:"Hard",tags:["Database","SQL"],pop:150},
        {id:4,key:"14cC0k",title:"Binary Search Tree",desc:"Implement insert, delete, and traversal.",language:"C++",difficulty:"Medium",tags:["DS","Tree"],pop:230},
        {id:5,key:"PeaCk4",title:"Dynamic Programming - Knapsack",desc:"01 knapsack with reconstructing chosen items.",language:"Python",difficulty:"Hard",tags:["DP","Greedy"],pop:410},
        {id:6,key:"nxKm1",title:"Simple Sorting",desc:"Implement quicksort and explain worst-case.",language:"Java",difficulty:"Easy",tags:["Sorting","Algorithm"],pop:120},
        {id:7,key:"867Fkl",title:"Authentication Flow",desc:"Design JWT auth with refresh tokens and revoke.",language:"JavaScript",difficulty:"Medium",tags:["Auth","Security"],pop:330},
    ];

    return { questions };
}