
export default class MiddlewareController {
  private static handle: any;
  
  public static CheckIfSessionActive(req: any, res: any, next: any) {
    if (req.user) return next();
    return MiddlewareController.RedirectToLogin(req, res);
  }

  public static RedirectToLogin(req: any, res: any) {
    return res.redirect('/user/login');
  }

  public static LogRequestUser(req: any, res: any, next: any) {
    console.log('req.user', req.user);
    next();
  }

  public static SetNextJSHandle(handle: any) {
    MiddlewareController.handle = handle;
  }

  public static UseNextJSHandle(req: any, res: any) {
    MiddlewareController.handle(req, res);
  }
}
