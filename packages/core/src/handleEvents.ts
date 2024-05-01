import { getTimestamp, reportData } from "@imrobot/monitor-helpers";
import errorStackParser from "error-stack-parser";
import { parseSourceMap } from "./helpers";
import type { ResourceErrorTarget, XHRData } from "./types";
import { getErrorUid, hasHash } from "./utlis";

export const handleError = async (err: Error) => {
  const { fileName, columnNumber, lineNumber } = errorStackParser.parse(err)[0];

  const res = await fetch(`${fileName}.map`);
  const sourceMap = await res.json();
  const data = await parseSourceMap({
    sourceMap,
    lineNumber: lineNumber!,
    columnNumber: columnNumber!,
  });

  const errorData = {
    fileName: data.file,
    url: location.href,
    message: err.message,
    lineNumber: data.line,
    columnNumber,
    time: getTimestamp(),
    code: data.code,
  };

  const hash = getErrorUid(
    `${errorData.message}-${errorData.url}-${errorData.lineNumber}-${errorData.columnNumber}`
  );

  if (!hasHash(hash)) {
    reportData("/error/code", errorData);
  }
};

/**
 * 处理加载资源错误
 * @param err 错误详情
 */
export const handleResourceError = ({
  src,
  localName,
  href,
}: ResourceErrorTarget) => {
  const errorData = {
    url: location.href,
    source: src || href,
    target: localName,
    time: getTimestamp(),
  };
  const hash = getErrorUid(
    `${errorData.source}-${errorData.url}-${errorData.target}`
  );

  if (!hasHash(hash)) {
    reportData("/error/resource", errorData);
  }
};

/**
 * 处理 Promise 错误
 * @param ev 错误信息
 */
export const handleUnhandleRejection = (ev: PromiseRejectionEvent) => {
  if (ev.reason.name === "AxiosError") return; // 防止 axios 请求错误触发
  const { fileName, columnNumber, lineNumber } = errorStackParser.parse(
    ev.reason
  )[0];
  const errorData = {
    fileName,
    url: location.href,
    message: ev.reason.message,
    lineNumber,
    columnNumber,
    time: getTimestamp(),
  };
  const hash = getErrorUid(
    `${errorData.message}-${errorData.url}-${errorData.columnNumber}`
  );

  if (!hasHash(hash)) {
    reportData("/error/code", errorData);
  }
};

/**
 * 处理请求错误信息
 * @param data 请求信息
 */
export const handleHTTPRequest = (data: XHRData) => {
  const { url, sendTime, status, elapsedTime, response, requestData, method } =
    data;
  if (status === 0 || status! >= 400) {
    const errorData = {
      url: location.href,
      requestURL: url,
      time: sendTime,
      status,
      response,
      elapsedTime,
      method,
      requestData,
    };
    const hash = getErrorUid(
      `${errorData.response}-${errorData.method}-${errorData.status}`
    );

    if (!hasHash(hash)) {
      reportData("/error/request", errorData);
    }
  }
};
