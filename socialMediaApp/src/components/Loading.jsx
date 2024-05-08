import React from 'react'

export function Loading() {
    

    return (
        <div className="d-flex justify-content-center spinner">
          <div
            className="spinner-border"
            role="status"
            style={{ width: "5rem", height: "5rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
}


