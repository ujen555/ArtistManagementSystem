import React from 'react'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
const AppTable = ({ columns, data ,pagesArray,setPage,isPreviousData, page,totalPages}) => {
    const nextPage=()=>setPage(prev=>prev+1);
    const prevPage=()=>setPage(prev=>prev-1);
    return (
        <>
        <div className="cTableWrapper">
            <table className="cTable">
        <thead>
            <tr className="">
            {columns.map((col, index) => (
                <th key={index} className="">{col.header}</th>
            ))}
            </tr>
        </thead>
        <tbody>
            {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="">
                {columns.map((col, colIndex) => (
                <td key={colIndex}>
                    {col.render ? col.render(row) : row[col.accessor]}
                </td>
                ))}
            </tr>
            ))}
        </tbody>
            </table>
        </div>
            <div className="cTable__pagination">
                <button className="cTable__pagination__btn cBtn cTable__pagination__btn--pageNav" onClick={()=>prevPage()} disabled={isPreviousData || page===1}>
                    <span>
                        <FaLongArrowAltLeft />
                        Previous
                    </span>
                </button>
                <div className="cTable__pagination__pages">
                    {pagesArray.map(pg=>
                        <button className={`cTable__pagination__btn cBtn ${page===pg?'active':''}`} key={pg} onClick={()=>setPage(pg)} disabled={isPreviousData}>
                            <span>
                                {pg}
                            </span>
                        </button>
                    )}
                </div>
                <button className="cTable__pagination__btn cBtn cTable__pagination__btn--pageNav" onClick={()=>nextPage()} disabled={isPreviousData || totalPages===page}>
                    <span>
                        Next
                        <FaLongArrowAltRight />
                    </span>
                </button>
            </div>
        </>
    );
};

export default AppTable;
