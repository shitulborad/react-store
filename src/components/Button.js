import styled from 'styled-components'

export const ButtonContainer = styled.button`
text-transform:capitalize;
font-size:1.4rem;
background:transparent;
border:0.05rem solid var(--lightBlue);
border-color:${props=>props.detail?'var(--mainYellow)':'var(--mainBlue)'};
color:${props=>props.detail?'var(--mainYellow)':'var(--lightBlue)'};
border-radius: 0.5rem;
padding:0.2rem 0.5rem;
cursor:pointer;
margin:0.2rem 0.5srem 0.32rem 0;
transition: all 0.5s ease-in-out;
&:hover{
    background:${props=>props.detail?'var(--mainYellow)':'var(--lightBlue)'};
    color:var(--mainBlue)
}
&:focus{
    outline:none;
}
`;