  
  export default function SuccessMessage({ message }) {
    return (
      <div className="flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <svg className="fill-current w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-4l6-6-1.41-1.41L9 11.17 6.41 8.59 5 10l4 4z" />
        </svg>
        <span>{message}</span>
      </div>
    );
  }
  