interface FormNoticeProps {
  message: string;
}

export const FormNotice = ({ message }: FormNoticeProps) => {
  return (
    <div
      className={
        'bg-green-100 text-green-800 p-4 mb-6 rounded-md'
      }
    >
      <p>{message}</p>
    </div>
  );
};
