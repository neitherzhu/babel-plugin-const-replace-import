# babel-plugin-const-replace-import

> 将通过import的方式引入的指定类库转换成const的方式

## Install

Using npm:

```sh
npm install --save-dev babel-plugin-const-replace-import
```
## Usage

在`.babelrc`的`plugins`中增加代码
```js
"plugins": [
    ["babel-plugin-const-replace-import", {
      "libraries": {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-redux": "ReactRedux",
        "redux": "Redux",
        "react-router-dom": "ReactRouterDOM",
        "redux-actions": "ReduxActions",
        "react-loadable": "ReactLoadable",
        "moment": "moment",
        "antd": "antd",
        "axios": "axios"
      }
    }],
```