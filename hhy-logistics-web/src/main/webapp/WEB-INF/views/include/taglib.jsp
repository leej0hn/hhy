<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fns" uri="/WEB-INF/tlds/fns.tld" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<c:set var="ctx" value="${pageContext.request.contextPath}${fns:getAdminPath()}"/>
<c:set var="ctxStatic" value="${pageContext.request.contextPath}/statics"/>
<c:set var="ctxFull" value="<%=basePath%>"/>
<script type="text/javascript">
    var ctxJS = '${ctx}';
    var ctxStaticJS = '${ctxStatic}';
    var ctxFullJS = '${ctxFull}';
</script>