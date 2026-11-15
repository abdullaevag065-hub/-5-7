import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios';
import { toast } from 'react-toastify';
 
export default function Form({getTask}) {
  const schema = yup.object({
    task: yup.string('введите строку').required('Введите хотя бы 1 значение'),
    level: yup.string('введите строку').required('Введите хотя бы 1 значение'),
  });
  
  const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)});

  const onSubmit = (data) => {
    axios.post('http://localhost:8000/task', data)
    .then(() => {
      getTask()
      toast.success(`Задача ${data.task} создана!`)
    })  
    .catch((e) => console.log(e))
  }
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('task')} type="text" />
        {errors?.task && (<p>{errors?.task?.message}</p>)}
        <select {...register('level')} name="level" id="level">
          <option value="hard">Hard</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit">Создать</button>
      </form>
    </section>
  )
}
