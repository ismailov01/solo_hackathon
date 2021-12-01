import React, { useContext } from "react";
import { Button } from "@mui/material";
import { clientContext } from "../contexts/ClientContext";

const Pagination = () => {
//   const { totalPosts, postsPerPage, handlePage, currentPage } =
//     useContext(clientContext);
//   const pageNumbers = [1];
//   if(currentPage === 1){
//       pageNumbers.push(2, 3, 4, Math.ceil(totalPosts / postsPerPage))
//   }
//   else if (currentPage === Math.ceil(totalPosts / postsPerPage) || currentPage === Math.ceil(totalPosts / postsPerPage) -1 ){
//       pageNumbers.push(Math.ceil(totalPosts / postsPerPage) - 3, Math.ceil(totalPosts / postsPerPage) - 2, Math.ceil(totalPosts / postsPerPage) - 1, Math.ceil(totalPosts / postsPerPage))
//   }else if(currentPage ===2){
//       pageNumbers.push(2, 3, 4, Math.ceil(totalPosts / postsPerPage))
//   } else{
//       pageNumbers.push(currentPage - 1, currentPage, currentPage + 1, Math.ceil(totalPosts / postsPerPage))
//   }
const { totalPosts, postsPerPage, handlePage, currentPage } = useContext(clientContext)
const pageNumbers = []
for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
    pageNumbers.push(i)
}

    return (
        <div className="pagination">
            <ul>
                {
                    pageNumbers.map((page) => (
                        <li  key={page}>
                            <Button 
                                style={{ background: page === currentPage ? '#FA2A3A' : 'black', margin: '5px'}}
                            variant="contained" 
                            onClick={() => handlePage(page)}
                            
                            >{page}</Button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Pagination;
