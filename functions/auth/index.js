import { login, path as loginPath} from "./login"
import { register, path as registerPath} from "./register"

export default (route, ...rest) => {
  if(route.match(`^${loginPath}`)) login(...rest)
  if(route.match(`^${registerPath}`)) register(...rest)
}