const btn=document.querySelector("#btn");
let input_text=document.querySelector("#input_text");
let content=document.querySelector("#content");
let work=[];
let count=0;
let btn1=document.querySelector("#btn1");
let flag=false;
function refreshItems()
{    
    content.innerHTML="";
        setTimeout(()=>{
        work.map((val)=>{
               
                flag=true;
                content.insertAdjacentHTML("afterbegin",`<div class="items" id="${val.id}">
                <h2>${val.text}</h2>
               <div class="prop">
                   <i class="fas fa-angle-up"></i>
                   <i class="fas fa-angle-down"></i>
                   <i class="fas fa-check-square"></i>
                   <i class="fas fa-trash"></i>
                   <i class="far fa-edit"></i>
               </div>
            </div>`);
               
        })
       },1);
    };
const addData=()=>{
    let text=input_text.value.trim();
  refreshItems();
   if(text!="")
   {
        count++;
        work.push({text,id:count});
        
        count++;
        input_text.value=""; 
        input_text.focus();
    }
    else{
        alert("Please enter Something");
    }
    
}
console.log(content.innerHTML);
document.addEventListener("keydown",(e)=>{if(e.key==="Enter")
{
    addData();
}});
btn.addEventListener("click",()=>{
    addData();
    btn.style.transition="all 1s ease";
    if(flag)
    {
        btn.innerHTML='<i class="fas fa-check"></i>';
    function changeIcon(){
        btn.innerHTML='<i class="fas fa-plus"></i>';
        flag=false;
    }
    setTimeout(changeIcon,500);
    }
    
});

content.addEventListener('click', deleteCheck);
function  deleteCheck(e){
const item=e.target;
if(item.classList[1]==="fa-angle-up")
{
    const todo=item.parentElement.parentElement.getAttribute('id');
    console.log(todo);
     let index=-1;
     for(let i=0;i<work.length;i++)
     {
         if(work[i].id==todo)
         {
             index=i;
         }
        
     }
     if(index!=work.length-1)
     {
        const temp=work[index+1];
        work[index+1]=work[index];
        work[index]=temp;
        
        refreshItems();
     }
     else{
         alert("Can't Perform Requested Operation");
     }
}
if(item.classList[1]==="fa-angle-down")
{
    const todo=item.parentElement.parentElement.getAttribute('id');
    console.log(todo);
     let index=-1;
     for(let i=0;i<work.length;i++)
     {
         if(work[i].id==todo)
         {
             index=i;
         }
        
     }
     if(index!=0)
     {
        const temp=work[index-1];
        work[index-1]=work[index];
        work[index]=temp;
        
        refreshItems();
     }
     else
     {
         alert("Chill");
     }
}
if(item.classList[1]==="fa-trash")
{
    const todo=item.parentElement.parentElement;
 todo.classList.add("slide-out-elliptic-top-bck");
todo.addEventListener("animationend",()=>todo.remove());
const newArray=work.filter(({id})=>id!=todo.getAttribute("id"));
work=newArray;

}
if(item.classList[1]==="fa-check-square")
{
    item.parentElement.parentElement.children[0].style.textDecoration="line-through";
    item.parentElement.parentElement.classList.toggle("rotate-vert-center");
}
if(item.classList[1]==="fa-edit")
{
  const change= prompt("edit here!");
  if(change!="")
  item.parentElement.parentElement.children[0].innerText=change;
  }
}

btn1.addEventListener("click",(e)=>{
    console.log(e.target.value);
    let todos=content.childNodes;
    console.log(todos);
    todos.forEach(function (todo){
        switch(e.target.value)
        {
            case "all":
                todo.style.display='flex';
               break;
            case "completed":
                 {
                     if( todo.classList.contains("rotate-vert-center"))
                     {
                        todo.style.display='flex';
                     }
                     else
                      todo.style.display='none';
                     break;
                 }
            case  "remaining":
                {
                    if( !todo.classList.contains("rotate-vert-center"))
                    {
                       todo.style.display="flex";
                    }
                    else
                    todo.style.display='none';
                    break; 
                }
                
        }
    });;

});