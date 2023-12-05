import {Atom, LucideProps} from 'lucide-react'




export const Logo = ({width = 40, height = 40, ...rest}: LucideProps) => {
  return (
    <Atom width={width} height={height} {...rest} />
  )
}
