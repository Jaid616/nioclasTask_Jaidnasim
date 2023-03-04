import { MathJax } from 'better-react-mathjax';
import React, { useEffect, useState } from 'react'
import "./question.css"
const Question = () => {

    const [Question, setQuestion] = useState('');
    const [counter , setCounter] = useState(0);
    const [loading , setLoading] = useState(true);
    const [error , seterror] = useState('');

    const QuestionID = ['AreaUnderTheCurve_901','BinomialTheorem_901','DifferentialCalculus2_901']
   
    const getQuestion = async () => {
         try {
          const response = await fetch(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${QuestionID[counter]}`)
        const data = await response.json()
         setQuestion(data[0].Question)
         setLoading(false);
          
         } catch (error) {
          seterror(error.message)
          setLoading(false);
         }
          
}

const questionNumberPre =()=>{
    if(counter>0)
    {
        setLoading(true);
     setCounter(counter-1);
    }
    else{
        return counter
    }
    
}
const questionNumberNext =()=>{
    if(counter<QuestionID.length-1)
    {
        setLoading(true);
     setCounter(counter+1);
    }
    else{
        return counter
    }

}

    useEffect(()=>{
        getQuestion();
    });

    if(error){
  
      return(
        
        <h3>{error?error:null}</h3>
        )
    }
    
  return (
    <>
    {loading? 
     <div className='loader-screen flex'>

    <div className="loader"></div>  
     </div>:
     <div style={{maxWidth:'620px',
      margin:'auto',marginTop:'50px'}}>
     
      <MathJax>
        
     <h3>{Question}</h3>
      </MathJax>
      
  {Question?<><div className='flex justify-space-between'><button className='btn' onClick={questionNumberPre}>Previous</button>
     <button className='btn' onClick={questionNumberNext}>Next</button> </div></>:null}
    
     
   </div>
      }
    

    </>
    
  )
}

export default Question
