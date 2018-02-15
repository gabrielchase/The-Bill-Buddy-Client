import React, { Component } from 'react'

import { callAPI } from '../utils'

class Dashboard extends Component {
    async componentWillMount() {
        await callAPI()
    }

    render() {
        return (
            <div className="container">
                <h1 className="center-text">The Bill Buddy!</h1>
                <br/>
                <br/>
                <div className="row center-text">
                    <div className="column">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASySURBVGhD7ZpZ6G1THMf/Ml1z95oyZHYl81A8IKRMhcgtHnSLDBnKgyEkwwMRiQeRSChDMqbMMmfKWApJGRIylSnT57Pu+dW6+7/Hc87eHpxvfR5+v7P22vu391q/tfdvnblMW8Ld8B38MzBfwb2wL0yk7eFbKDvJkPwN18IK0FkrwjtgR4/BBtCnNoYfwfNdCavBJnAx/Ab6r4bOWgIe/BHYad/yjnu+B5K1vPaHX8Enc4COLroP7PjMZPWvz8Hz7Z2s+ToH/P3ZZHXQZ+CBOyWrX20EnuunZJXLUfEN2G5bHW0V43KNZPWr3cFzOSfrdDvY7pRktdQv4EHrJKtf7Qqe6/1kVesMsN11yWqpj8GDPEnfMiN6Lm9enY4F292VrJa6AzzoomT1r7hxZqgqHQ62eTRZLXUoeNCXsFBHz7oUPN8z4BpWprECcRU11Xnga+CENKC+2Aq+B893J2wBRY0ViNoU4pEPzQtQ1NiBKO/WVfA2fDLiU7DDvzLftLkHipookDKZku3wh2QNp1kgVZoFMqFmgVTpfxHIZrAH7AYLdIzkt7/+tuwCK0GuwQLZDv4Ef5OnQO0Jrjnhb8stkGuwQBaBF//GiPNBbQi+Q4W/Da/DCZBrNkeqNAtkQg0ayDYQmWctHSMthjwrNeFnQ5711GHgeR9K1hRUFcgOkGen50DtBdakwt+W2yDXuvAwHJWsKagqEP0PglnHj7GzQK0PDodiZqrjVbBI2Kv+qzmyCrjgui5Zl86H7lgaOpCDwcrnzxDDThzGPrmzYayy7lCB+KkddYO4cGvRL8F7kAdmkaTz3KkLxHesg0Y4OUMOh/CXcSCsDSEzl/sjcZHOt+KOgEPNao9JxXYmlPOgtaoC2Rny7PQiKAvT4avjflA+iQjCVNtmLpwKf4DHLNXRRlWBrAlWAZ+EJ+AkUBYw3HnSX8XjcAyopyGCKNa41gOf4I7JWl7HgzfSunVZOWme+pwjh4B9+0TKnkSs7lVl05vB362UNqrPQGJfJtagopoCcYvid/Cp5HOuVH0FsjKYicxOVVt9TYEoh6ltYqhWqi6Q/cCquZ24LxgyK+kvcjREdnOxs1+rmyHvcN7+CrCNlcjc72tQKOrIFySrRlWBmLX0B6+Acns59xd5BJQXo/1yspYpnkAT+RM6HfRdn6waVQXi6nojmKHELKKctH62hj/H0ugRoPxUtt93k7VMvgXn7X0StnFrMPfnc8q1xDaXJ6tBTii/z6u2AMaRk9P54V7iqjpK1GaO3Aq2abVF9yHY2Ds2TfnuZL+m4TI1BWLl5WuwzdY6mhT74tcka3ryBdB+n0/WfDUF4grv728mq4VcWR1abuR32i5u0OrwBXgxp+koKOZM2TrjZlFsYRtwa90EHuRurCWfaelI8FXDeXicjhYyiA/A6ynbW6mVd8/6kwebRfymnpbOBfs1IF87XE/K5JxwOMWTcI55XZ0VRTk7EZ+Of35xT/zkjpwIvvmGfIuNPy74dHwRvQQccqZYs1NMbHHITfQHB++Kncf/SSahWCHZHNwcjYDKeAumORrSmrIP+AcY/53gHOqCi2nVn8xcVH3tuRBugMvAdaImxc7N/QtHxkwORG1TbQAAAABJRU5ErkJggg==" />
                        <h4 className="use">Organize Bills and Payments</h4>
                        <ul>
                            <li>Separate your bills by services, companies, or even categories.</li>
                            <li>Add, see, and sort all payments of a bill.</li>
                            <li>Easier to manage and keep track of all your bills.</li>
                        </ul>
                    </div>
                    <div className="column">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASFSURBVGhD7ZlXqB5FGIaPPXYNKsGGWLDHYMGOFTWKomIBsYE3IRBUYlAQ8c4LEXu/EHsDRUXEAiZYkEAwEMWbqESQCPbYu3mePfk4c+bMnvXff/PnB88LD5z5Zv85++7MNzM7OzKlMW0Fj8IP8DlcDUOtDWG90T/H6Tn4N+MyWGfaFO6CbyC/sSZ+hB1hThLrhY/hUuhEd4CN/gPfZnwH1v2dxAKv/w0Og2vB636H9BqHnfE/k1heZzsnQ9/6Cmxs76o0XluD/+yzqjRej4B1KedBqmPA+NtVaaIWgPUPVaU+ZUPfj/45QZMZcUjam9Z9AKUh0mTkDLD+5arUp9oa+S8aGiMbgAntGD8Stu2B6XAD2P4zUNLAjKjbwWvaYv6dCCUN1MhG4JP9EPKZZzK+hnfgLKjTQI2sTU0ZKel/Z8Q91+6wa1XqRuvEiAa8tu2aUtJQGIke2rkqtdNAjKwP3uhuVWmikSgvq0plbQe2UccVYBtvJrES3oOL86SqMxLbk6jrxcge8B5Y3xXuMOZCrbyoayPvg3Vfwicd4auEu4TjoKjciF14CPgD63wSlmM8f5GVl68p7wdqFzDu6+8mBjrSdWC7t1WlgqxMjURP9Er0zIGQltVOoNlemQlOKuoisN0nqlJBVqZGtoAlLXgaVG7EWc03R2NtuBlUz0b6VW4k3kkcoqUHUMenkN740Bipe7mqU37jQ2NkKZTyoI7roXMjHsYdAPvCxgYmUW7EN0vLbenEyD7wAqTJugruhu2hpNzI5vA8lPKgCRfV00G1NnIamKDWa+SjNX8HK2BPyJUb6UqtjLhqG7PuPvAwIVbyFF9/fRVOVTJiz3oIdzw4vYf2h4h7vBQ6CIy7KMei2sqIN2/8sao0qpIRuRxS5Ubstb8gro8TFU245Yh4HNIdDhETz85UKyMrwXg6dOqMmEOpmpJ9EaiYzYKXQMXWJ3gcVM9GpoGxn6vSmHaANxLeBa9zWk2VG7E9e9bfvA7ng9oSngLjr8GZoDwPexaMvwpxLtyqR0xud5vpuM11LPhbj3xSDVWyvwXGL65KZd0JXnNLVRpTyUgkr7gpDR0Mxk4CeyjkCb9xD/Y2M4BaGbkQjPs+YVLmOhtM4D9gLwOJciOe8qdJ7Zqi3NlGTB4GdTSkcb/dqFZG/ELlOLXuF/DpXwCeuLvLddhZtwBy5UaOAMtBU7K7AKbx1skeciviCh43nfITzIOSSsl+L/hgJI5QXfEfhIifAmobcCqOeLwRtjYS8s3vRvDJ+HHnSpgBdRqqZO9HJSNHgdPuuZDu0Zz5Iu60GzLJjZ8DblhVoxGHTr5m9KPciDvmNNljAZ0FEZPIhZjWA4elajQSm8GbwKfQL/PB9uqSfSGofHZ6EdRsSOOxTWo04lTqF6n0x10QRtxU+rHIxHXGOxWUi+09YNwV/gRQrif3g/EnwWGpGo2oQ+FW8Mf98gr4D/1A2qUuAdt1whmInG5/BXv5GigNv16xNxaDRq6CgSnypGvM5/R9ZiBy/+RwfaADzBl7wkV0SlNa+xoZWQ0jduFkd+S4AQAAAABJRU5ErkJggg==" />
                        <h4 className="use">Visualize Data</h4>
                        <ul>
                            <li>Visually understand how much you're paying for a certain service.</li>
                            <li>Compare costs at sight.</li>
                        </ul>
                    </div>
                    <div className="column">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASHSURBVGhD7ZppqFZFGIBvlpkVliYuBEokGS2mEKZkKZggSiopLtAqRKkZmYRCEUarYGkpaJYSgf6QIKwg6ocKEopRuCQRipJRUmFWtllqPc/ExEW99ztnzvIJ+cADztzvvHOWObO8x5aznEp3vBOX4Sb8En/Gv/EYHsLP8G18AkfguXhG0AHH4YfoyXrSefwWX8K+2DS8o7swntTv+C7ORf/WB8/HSBe8FifiItyN8di/8GW8FGujI3oXT6AnsQ9noyealxvwDfRCjGV3vAkr50LcgDb6Bz6Ore96KtfhRxjj+tQqwxPeiDb2NQ7GMjkP7V7GP4q3YyW8ijbyFV5pRUU8jbbzI15lRZmMRYP/ioOsqJi1aHtb8BwrysAutQcNPMuKGrgYD6Bt3mVFGdyNBtyOdU5gU9B2HaZLeSofowEnh1J9ONnGnnCbFUW4Ag3kDOyoUjePoe2vCKUCONEZyEmrGfRH23e4L8SbaKCpodQc9qPncHkoJbITDXJNKDWH9eg5jAmlRH5BV7XNXG6/gF5I8tB/ARrgu1CqjlHoQrQtHkXPY0EoJWCfNMAXoVQNQ9EnvhXbeur3ouexNJQS6I0GcCyvgk7ojtE2nrSiDZzZ/Y07zyQuQQO4R6gCu4rxHVDa2wrMQH/3fCgl4B0zgHvtsnH/4VLdbtVoOzAHPY/kd0R80Q3ihqosfBd8J4z7ohUNcFvsbx8MpUTiPHJ1KJXDI2jMvXiRFQ2IS/pJoZTAaPTR/4YmDcrAtZtzk/v9kVZkwOWRF+JTtLvnojMeRBscb0UDXJ06yrWHS/EP0JN63YqM2K1jV2xvdDstcaQwmdaIYWjCwGxKe1vTe9CY32BXK3Jg1/4Tf0I3XZmJd84tbiPMRW1Gf/89ni6d0xMd/fzNHVYk8D56/IRQyogn5EHOJVmwK/r0PMZ34OQbsA7921uhlMY8NMazoZQBh0cPMHOYB4+LmRYTbtNRfMes+wF7WZFI7JqrQykjZks8yDudl6fQYx0onkE3RZbvwyI8jMZZHEoZiVm/1CTZTGyd1DbJXTSBYF7ZWD6ZzLj29yDzSql7EScwRzPfGeePIgzE42isblZkxYnH4dSLSV6swXC8/99/JuNQHbP+ZiFzMwRd2BnAJXTqkymCg0NcJn2KuWf2iDP2EYyB3M3VgZOeqaA493yCl2EhbsQdaEA181g1cbBx5FuDWeezhpicew4NbiNVcj3azmG0e5eOc0qc8QdYURHL0TaSXuysxG8XrsVKS/e3wu2CQ7aDTKPVdCH8BO3y3ot5wIoSsfvGhHmWnWNhnO1tzGWM80QZ+HRXonHNrJhTq4UlaKMOzTdbUQAv4hU0nv/BoI4vYv9h4+7ybNw+/RCm4NzwHsYnfAvWjh9izHDE7+3vYD/MgjdiGvph1WPN1tyKTcXFoWO+J+Ro8xq21T1cYngB29Dfq7vLQp8MyqQHrkJXqPEEP0e/m7uSdrnhLjEuOdS9u5svn+wZh1+YfHH9Rh5P+GRdBJrcyJVEaBbmcu3z89ELW4gu57O+Q/9XWlr+ASLwNv3bdTvWAAAAAElFTkSuQmCC" />
                        <h4 className="use">Be Reminded</h4>
                        <ul>
                            <li>Keep track of costs ahead of time.</li>
                            <li>Don't miss payments.</li>
                            <li>Budget accordingly.</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard 
