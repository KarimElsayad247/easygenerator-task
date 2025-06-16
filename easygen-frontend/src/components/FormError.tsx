interface FormErrorProps {
  message: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  return (
    <div
      className={
        'bg-red-50 text-destructive p-4 mb-4 rounded-md'
      }
    >
      <p>{message}</p>
    </div>
  );
};
