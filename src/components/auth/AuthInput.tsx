interface AuthInputProps {
   label: string
   value: any
   type?: 'text' | 'email' | 'password' 
   required?: boolean
   changedValue: (newValue: any) => void
}

export default function AuthInput(props: AuthInputProps) {
   return (
      <div className={`flex flex-col mt-4`}>
         <label>{props.label}</label>
         <input 
            type={props.type ?? 'text'}
            value={props.value} 
            onChange={e => props.changedValue?.(e.target.value)}
            required={props.required}
            className={`
               px-4 py-3 rounded-lg bg-gray-200 mt-2 
               border focus:border-blue-500 focus:bg-gray-100
               focus:outline-none
            `}
         />
      </div>
   )
}