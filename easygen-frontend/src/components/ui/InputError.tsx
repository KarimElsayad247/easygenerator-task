interface InputErrorProps {
  message: string;
}

export const InputError = ({ message }: InputErrorProps) => {
  return (
    <div>
      <p className={'text-destructive text-sm'}>{message}</p>
    </div>
  );
};
