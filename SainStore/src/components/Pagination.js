import React, { useState } from 'react';
import profilePhoto from "../images/unknownMale.jpg";
import { FaStar} from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';

export default function Pagination(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = recordsPerPage * currentPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = props.data.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(props.data.length / recordsPerPage);
    const pagesNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    function prevPage(e) {
        e.preventDefault();
        if (currentPage !== 1) {
            setCurrentPage(prev => prev - 1);
        }
    }

    function nextPage(e) {
        e.preventDefault();
        if (currentPage !== totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    }

    function changeCurrentPage(e, pageNumber) {
        e.preventDefault();
        setCurrentPage(pageNumber);
    }

    return (
        <div>
            {records.map((item, index) => (
                <div key={index} style={reviewContainer}>
                    {Array(5).fill(0).map((d, i) => {
                        return (
                            <span key={i}>
                                {item.rating >= i + 1 ? (
                                    <FaStar color='orange' />
                                )  : (
                                    <AiOutlineStar />
                                )}
                            </span>
                        );
                    })}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: 16, marginTop:"10px" }}>
                        <img style={{ width: "50px", borderRadius: "50%" }} src={profilePhoto} alt="Profile"/>
                        {item.user_name}
                    </div>
                    <p><strong>{item.review_title}</strong></p>
                    <p>{item.review_content}</p>
                </div>
            ))}
            <nav>
                <ul style={paginationContainer}>
                    <li>
                        <button onClick={prevPage} style={paginationLink}>Prev</button>
                    </li>
                    {pagesNumbers.map((pageNumber, index) => (
                        <li key={index} style={paginationItem}>
                            <button
                               onClick={() => changeCurrentPage(pageNumber)}
                               style={{ ...paginationLink, ...(pageNumber === currentPage ? activePageLink : {}) }}>
                                {pageNumber}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button onClick={nextPage} style={paginationLink}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

const reviewContainer = {
    margin: "40px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const paginationContainer = {
    display: "flex",
    listStyle: "none",
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
};

const paginationItem = {
    margin: "0 5px",
};

const paginationLink = {
    textDecoration: "none",
    padding: "10px 15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    color: "#007bff",
    transition: "background-color 0.3s, color 0.3s",
};

const activePageLink = {
    backgroundColor: "#007bff",
    color: "#fff",
};
